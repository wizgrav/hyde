---
layout: post
title: Hello Pinect
categories: pinect
---

Pinect is a linux kernel module for the xbox360 kinect device. It is based on the work done by the [openkinect community](http://openkinect.org/) and intended as an alternative to using [libfreenect](https://github.com/OpenKinect/libfreenect). Besides being more efficient, it also works reliably on targets where libfreenect does not, due to usb issues, specifically the popular [raspberry pi board](http://www.raspberrypi.org/).

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='http://www.youtube.com/embed/uDNKR1b1FdY' frameborder='0' allowfullscreen></iframe></div>

### Install

Assuming a debian distro, you need some prequisites to fetch and build the source:

{% highlight bash %}
sudo apt-get install git build-essential
{% endhighlight %}

You'll also need the kernel headers for the running kernel to build modules against. For the raspberry pi the following should work:

{% highlight bash %}
sudo rpi-update && sudo reboot
sudo wget https://raw.githubusercontent.com/notro/rpi-source/master/rpi-source -O /usr/bin/rpi-source && sudo chmod +x /usr/bin/rpi-source
rpi-source
{% endhighlight %}

enter the directory where pinect is extracted or cloned and:

{% highlight bash %}
make
{% endhighlight %}

assuming no errors you have built the kernel module.

to load it:

{% highlight bash %}
make load
{% endhighlight %}

or 

{% highlight bash %}
make load-pi
{% endhighlight %}

which optimizes the module's operation for the raspberry pi. Experiment but mind that this switch will probably degrade performance slightly on other linux targets.

### Using it

In the module's repo there's also a tiny lib called libpinect. It handles the interaction with the kernel module and provides a simple api to work with.
Of course you can work with the v4l api directly. The frames come as 320x240 u16 arrays of integers whose values are the depth measurements(in mm) of every pixel.


you can build and install it like:

{% highlight bash %}
make lib
sudo make install
{% endhighlight %}

it installs in /usr/local/lib by default. A minimal api is provided:

{% highlight c %}
//filename of device. If NULL, opens "/dev/video0"
//Returns an object for use with the api or NULL on error.
pinect_dev *pinect_new(unsigned char *filename);

//Returns the next frame if available. 
//A previously captured frame will be released.
//r is the time to wait in sec. 0 means a blocking call.
//returns a 320x240 short int array. Values are depth in mm.
unsigned short *pinect_capture(pinect_dev *dev, int r);

//If work is done, you can optionally release the frame lock.
int pinect_release(pinect_dev *dev);

//When done with the object, destroy it to release the device
int pinect_free(pinect_dev *dev);
{% endhighlight %}


On top of the C api, a set of ffi-based bindings are also provided for luajit and python/pypy. Here's an example for testing performance of frame capture. You can run it in python, which needs the cffi module, and is slow, or preferably with pypy which has the ffi interface built in:

{% highlight python %}
#The ffi binding is pinect.py
import pinect
import time

#You can also pass a filepath as the argument like new("/dev/video1"). defaults to /dev/video0
dev=pinect.new()

print("Found device, running for 300 frames")

#Record starting time
start = time.time()

#Capture 300 frames. This will take ~10sec.
for count in xrange(0,300):
    pinect.capture(dev)
    
print("Average fps",300.0/(time.time()-start))
{% endhighlight %}

You can find a slightly more advanced example in the source distribution that displays the frame and the measured depth of points on mouse click. It requires SDL2 & dev headers installed. It uses the cffi's module facilities to compile and link a crude windowing lib written in ordinary C embedded in the python script. This capability is of great value on it's own so it will probably be the main focus of a later post.
