---
layout: post
title: Hello Nuikit
categories: pinect nuikit
---

This video has lot of explaining coming up. For now, suffice with a short summary.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='http://www.youtube.com/embed/wg2NqptTGOY' frameborder='0' allowfullscreen></iframe></div>

A basic finger counter I hacked this weekend with my pet projects, pinect for reading video from a kinect and nuikit for performing computer vision on it. The finger count is broadcast on the network as single byte UDP messages. 

A controller script in Bitwig picks them up and adjusts parameters. Keys in the controller act as gates to control when and which values change. Tracking is robust and very fast. Top shows usage at ~3% on my, idling, i5. This seems promising.
