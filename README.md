# **DG\_Takeover**

A lightweight, dependency-free JavaScript plugin for creating stable and accessible takeover navigations with enhanced animation control.

## **Table of Contents**

* [Description](#bookmark=id.ye062g930rxb)  
* [Features](#bookmark=id.92811ykusbkp)  
* [Installation](#bookmark=id.k6nwoa4pa47e)  
* [Usage](#bookmark=id.d1qhm1d54qjf)  
  * [HTML Structure](#bookmark=id.8byb2q8gi9rd)  
  * [JavaScript Initialization](#bookmark=id.8x8joiu2hb4c)  
  * [Options](#bookmark=id.zbsja2bsr42z)  
  * [Custom Events](#bookmark=id.macivqlzfmb1)  
  * [Styling with CSS](#bookmark=id.cggbeya8fjc2)  
* [Accessibility (ADA)](#bookmark=id.3z648rhdi4ei)  
* [Author & Version](#bookmark=id.7f5n8ny9w3xf)

## **Description**

DG\_Takeover is a refactored and modernized version of a traditional takeover navigation script. It provides a simple yet powerful way to implement full-screen overlay menus or "takeover" elements without relying on jQuery. It focuses on enhancing animation capabilities and ensuring accessibility standards are met.

## **Features**

* **No jQuery Dependency**: Built with vanilla JavaScript.  
* **Accessible**: Automatically adds ARIA attributes for improved accessibility.  
* **Animation Ready**: Provides classes for defining opening and closing animations via CSS.  
* **Custom Events**: Dispatches custom events for finer control over takeover states.  
* **Keyboard Navigation**: Supports closing with the Escape key and opening/closing with Enter/Space on toggle buttons.  
* **Scroll Locking**: Prevents body scrolling when the takeover is open.

## **Installation**

Simply include the DG\_Takeover class in your project. You can add it directly to your HTML file, or include it as part of your JavaScript bundle.

\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
    \<title\>DG Takeover Example\</title\>  
    \<link rel="stylesheet" href="style.css"\> \<\!-- Your CSS for takeover animations \--\>  
\</head\>  
\<body\>

    \<\!-- Your HTML content \--\>

    \<button data-dgtakeover-toggle="myTakeoverMenu"\>Open Menu\</button\>

    \<div id="myTakeoverMenuContent" data-dgtakeover-menu="myTakeoverMenu"\>  
        \<\!-- Menu content goes here \--\>  
        \<nav\>  
            \<ul\>  
                \<li\>\<a href="\#"\>Home\</a\>\</li\>  
                \<li\>\<a href="\#"\>About\</a\>\</li\>  
                \<li\>\<a href="\#"\>Services\</a\>\</li\>  
                \<li\>\<a href="\#"\>Contact\</a\>\</li\>  
            \</ul\>  
        \</nav\>   
    \</div\>

    \<script src="dg\_takeover.js"\>\</script\> \<\!-- Path to your DG\_Takeover class \--\>  
    \<script\>  
        // Initialize DG\_Takeover  
        window.onload \= function() {  
            new DG\_Takeover('myTakeoverMenu', {  
                duration: 0.7 // Optional: adjust animation duration  
            });  
        };  
    \</script\>  
\</body\>  
\</html\>

## **Usage**

### **HTML Structure**

You need two main types of HTML elements for DG\_Takeover to work:

1. **Toggle Buttons**: Elements that will open or close the takeover. They require the data-dgtakeover-toggle attribute set to a unique ID that links them to a specific takeover menu.  
   \<button data-dgtakeover-toggle="uniqueMenuId"\>Open Navigation\</button\>  
   \<a href="\#" data-dgtakeover-toggle="uniqueMenuId"\>Close\</a\>

2. **Takeover Menu**: The actual full-screen overlay element. It requires the data-dgtakeover-menu attribute, also set to the same unique ID.  
   \<div id="yourMenuContent" data-dgtakeover-menu="uniqueMenuId"\>  
       \<\!-- Your navigation links or other takeover content \--\>  
   \</div\>

### **JavaScript Initialization**

Create a new instance of DG\_Takeover by passing the unique ID of your takeover menu and an optional options object.

document.addEventListener('DOMContentLoaded', () \=\> {  
    // Initialize a takeover with the ID 'myTakeoverMenu'  
    new DG\_Takeover('myTakeoverMenu', {  
        duration: 0.5 // Optional: Set animation duration in seconds  
    });

    // You can initialize multiple takeovers with different IDs  
    new DG\_Takeover('anotherMenuId');  
});

### **Options**

The DG\_Takeover constructor accepts an options object with the following properties:

| Option | Type | Default | Description |
| :---- | :---- | :---- | :---- |
| duration | Number | 0.5 | The duration of the CSS animation in seconds. Used for setTimeout to synchronize JS logic with CSS transitions. |

### **Custom Events**

DG\_Takeover dispatches several custom events on the document object, allowing you to hook into different stages of the takeover's lifecycle.

| Event Name | Description | Triggered When |
| :---- | :---- | :---- |
| dg\_takeover\_init | Takeover has been initialized. | After DG\_Takeover instance is created and set up. |
| dg\_takeover\_opening | Takeover is about to begin opening animation. | Just before opening classes are added. |
| dg\_takeover\_open | Takeover has completed its opening animation. | After the duration timeout when opening. |
| dg\_takeover\_closing | Takeover is about to begin closing animation. | Just before closing classes are removed. |
| dg\_takeover\_close | Takeover has completed its closing animation. | After the duration timeout when closing. |
| dg\_takeover\_toggle | Triggers the takeover to toggle its state. | Can be dispatched manually to toggle. |
| dg\_takeover\_toggle\_open | Triggers the takeover to open if currently closed. | Can be dispatched manually to force open. |
| dg\_takeover\_toggle\_close | Triggers the takeover to close if currently open. | Can be dispatched manually to force close. |

**Example Event Listener:**

document.addEventListener('dg\_takeover\_open', (e) \=\> {  
    console.log('DG\_Takeover: Menu has finished opening\!');  
    // Perform actions after the menu is fully open  
});

document.addEventListener('dg\_takeover\_close', (e) \=\> {  
    console.log('DG\_Takeover: Menu has finished closing\!');  
    // Perform actions after the menu is fully closed  
});

// Manually trigger a toggle  
// document.dispatchEvent(new Event('dg\_takeover\_toggle'));

### **Styling with CSS**

DG\_Takeover relies on CSS to handle the visual animations. It adds and removes specific classes during the opening and closing processes. You'll need to define these classes in your stylesheet.

| Class Name | Applied To | Description |
| :---- | :---- | :---- |
| js-no-scroll | html, body | Prevents page scrolling when the takeover is open. |
| takeover\_\_opening | Takeover menu, Toggle buttons | Applied during the initial phase of opening. Useful for transition definitions. |
| takeover\_\_open | Takeover menu, Toggle buttons | Applied when the takeover is fully open. Define your "open" state styles here. |

**Example CSS (conceptual):**

/\* Basic styling for your takeover menu \*/  
\[data-dgtakeover-menu\] {  
    position: fixed;  
    top: 0;  
    left: 0;  
    width: 100%;  
    height: 100%;  
    background-color: rgba(0, 0, 0, 0.9);  
    color: white;  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    visibility: hidden; /\* Start hidden \*/  
    opacity: 0; /\* Start invisible for transition \*/  
    transform: translateY(-100%); /\* Start off-screen for slide animation \*/  
    transition: all 0.5s ease-out; /\* Default transition, matches JS duration \*/  
    z-index: 9999;  
}

/\* State when takeover is opening (optional, often combined with takeover\_\_open) \*/  
\[data-dgtakeover-menu\].takeover\_\_opening {  
    visibility: visible;  
}

/\* State when takeover is fully open \*/  
\[data-dgtakeover-menu\].takeover\_\_open {  
    opacity: 1;  
    transform: translateY(0);  
    visibility: visible;  
}

/\* For toggle buttons, if you want them to visually change \*/  
\[data-dgtakeover-toggle\] {  
    transition: transform 0.5s ease-out;  
}

\[data-dgtakeover-toggle\].takeover\_\_open {  
    /\* Example: rotate an icon for a "close" state \*/  
    transform: rotate(45deg);  
}

/\* Prevents scroll on html and body \*/  
.js-no-scroll {  
    overflow: hidden \!important;  
}

## **Accessibility (ADA)**

DG\_Takeover automatically enhances accessibility by adding the following ARIA attributes to the relevant elements:

* **Toggle Buttons (\[data-dgtakeover-toggle\]):**  
  * role="button"  
  * aria-haspopup="true"  
  * aria-expanded="false" (toggles to true when open)  
  * aria-controls="{menuId}" (links to the controlled menu by its ID)  
  * tabindex="0" (makes them focusable)  
* **Takeover Menu (\[data-dgtakeover-menu\]):**  
  * role="navigation"  
  * aria-hidden="true" (toggles to false when open)  
  * aria-label="Takeover Navigation"

These attributes help screen readers and other assistive technologies understand the purpose and state of the takeover navigation, improving the user experience for everyone.

## **Author & Version**

* **Author**: Durkan Group  
* **Version**: 0.1.0