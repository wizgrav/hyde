---
layout: page
title: Nuikit
weight: 2
---
<p>
..is a thin C library that provides core image processing operations for machine vision tasks. It can be used with input buffers of 8 or 16 bit integers to perform histogram calculation and blob tracking on them. An essential part of the toolkit is it's clipping/filtering mechanism which is geared for both efficiency and flexibility.</p>

<p>The api is set up so as to encourage the integrator to craft his own abstractions on top of the existing primitives. The library has no dependencies, internal memory allocation or floating point operations, which makes embedding it a trivial task. Directly mapped ffi bindings are also provided for luajit and python/pypy.
</p>
<p><b>check back later</b></p>

<ul class="posts">
	  {% for post in site.posts %}
     {% if post.categories contains 'nuikit' %}
      {% unless post.next %}
	      <h3>{{ post.date | date: '%Y %b' }}</h3>
	    {% else %}
	      {% capture year %}{{ post.date | date: '%Y %b' }}{% endcapture %}
	      {% capture nyear %}{{ post.next.date | date: '%Y %b' }}{% endcapture %}
	      {% if year != nyear %}
	        <h3>{{ post.date | date: '%Y %b' }}</h3>
	      {% endif %}
	    {% endunless %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
	   
	  {% endfor %}
</ul>
