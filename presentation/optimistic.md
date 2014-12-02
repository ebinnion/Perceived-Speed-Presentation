![110%](Screen Shot 2014-10-05 at 8.55.37 PM.png)

# Perceived Speed and Optimization

### Eric Binnion

### @ebinnion

---

![right](profile_crop.jpg)

# Eric Binnion

WordPress Core Contributor

Code Wrangler at Automattic

BA in Computer Science at MSU

@ebinnion

---

# Overview of this Session

- What is perceived speed?
- Why is it so important?
- Examples
- Implementation
- Questions?

---

# Perceived Speed
## **How quickly software** appears **to perform its task.**

---

![fit autoplay loop](google_no_instant.mov)

---

![fit autoplay loop](google_with_instant.mov)

---

![autoplay loop](p2_mercury_new_post.mov)

---

![autoplay loop](o2_new_post.mov)

---

# Which is Faster?

---

![autoplay left loop fit](p2_mercury_new_post.mov)

![autoplay right loop fit](o2_new_post.mov)

---

# Why?

---

> Perception is Reality
-- Lee Atwater

---

![](speed_image.jpg)

# Perceived Speed

> It's not about how fast your site is; it's about how fast your users think it is.
-- Kyle Peatt [^1]

[^1]: Quote from http://www.mobify.com/blog/beginners-guide-to-perceived-performance

---

# How do I Increase Perceived Speed?

---

# Optimistic Interfaces

## **A method of improving** perceived speed **of applications by** assuming **that interactions with the server will succeed.**

---

# Assume Success

```javascript
this.$el.slideUp( this.destroyViewModel( this, postId ) );
```

- Emulate while waiting
- Makes use of:
	- JavaScript
	- AJAX
	- Backbone, React, etc.

---

# Examples

- JetPack
- O2
- ROHO Sports / AppPresser

---

![autoplay](jetpack_inifinite_scroll.mov)

---

![right fit autoplay loop](roho_sports_subscribe.mov)

# Roho Sports

- AppPresser
- High School booster club
- Each sport had a separate site (multisite)
- Each site had to allow subscriptions

---

![autoplay](o2_trash_post.mov)

---

![autoplay](o2_trash_comment.mov)

---

# Credits

Perceived Speed Photo Credit: [Loïc Lagarde](https://www.flickr.com/photos/32553078@N08/13937130316/) - cc

Instagram screenshots: [https://speakerdeck.com/mikeyk/secrets-to-lightning-fast-mobile-design](https://speakerdeck.com/mikeyk/secrets-to-lightning-fast-mobile-design)

---

![fit left](instagram_optimistic_1.png)

![fit right](instagram_optimistic_2.png)

^ Slides from Mike Krieger in 2011 presentation titled "Secrets to Lightning Fast Mobile Design"

---

![fit](instagram_optimistic_3.png)

---

Arguably one of the most important user interface metrics is speed – Or, more importantly, perceived speed. While much can be done to speed up a user interface by beefing up servers and minimizing the weight of resources, optimistically processing interactions can greatly increase the perceived speed of your website. This talk will discuss real-life use cases of optimistic programming in apps you use, as well as a few ways to use optimistic programming on your WordPress website.