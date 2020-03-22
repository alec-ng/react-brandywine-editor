# 3.x.x

## 3.0.4
* UI Changes:
    * Carousel plugin responsive numCards
    * Markdown plugin add responsive CSS
    * Relative position root container
    * Responsive spacer padding
    * remove required proptypes from header properties

## 3.0.3
* Style changes - hoverable buttons, dropzone color, app bar placement
* UX changes:
    * moving blocks around doesn't affect focused element

## 3.02
* Peer/dev dependency changes:
    * `react-slick@^0.25.2` `slick-carousel@^1.8.1`, for carousel change
    * remove previous carousel peer deps on react-items-carousel and react-device-detect
* Enhancements:
    * Carousel plugin now uses [react-slick](https://github.com/akiran/)
    * Fancy styled dropzones
    * Move block deletion button to block container, allow deletion of any block other than just the focused one
    * minor global style changes

## 3.0.1
* change build command to copy files (missed styles.css)

## 3.0.0
* Breaking changes:
    * Implement separate read and editor exports
    * Remove readOnly prop for editor (since separate export solves need)
* Enhancements:
    * UI redesign:
        * removal of permanent sidebar, replace with material-ui/core/popper.js implementation
        * implement app bar containing canvas controls (zoom level, preview)
    * Readonly mode: 
        * customContent prop added to allow any element to be inserted between the header and block content if desired
* Dependency changes:
    * Move dependencies to peer, except for prop-types
    * Add new peer deps: material/core
    * Remove: react-bootstrap
* Build changes:
    * configure nwb to not build a UMD module and publish to npm
    * change nwb build command to not copy non.js files

# v2.x.x

## 2.0.0
* Enhancements:
    * memoization of onChange dispatch
    * carousel plugin style changes (navigation buttons)
    * prop-types for user prop typechecking and state shape
* Bug fixes:
    * canvas CSS padding fix
    * display date backslash bug fix
* API Changes:
    * removed following props:
        * verticalBlockMargin
        * onSave
* Dependency Changes:
    * version changes:
        * uuid ^3.4.0 -> ^7.0.1
    * remove:
        * react-fast-compare
    * remove plugin specific dependencies from "dependencies" and migrate them to peer and dev dependencies:
        * react-device-detect
        * react-items-carousel
        * react-markdown
        * react-visibility-sensor
    * add new dependencies:
        * redux
        * react-redux
        * immer
        * prop-types
* Refactoring:
    * general app restructuring
    * reducers use redux instead of context api
    
