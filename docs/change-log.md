# 3.x.x

## 3.02
* update documentation
* updates to carousel plugin
    * change dependency from react-items-carousel to [react-slick](https://github.com/akiran/react-slick)
    * remove peer its dependency on react-device-detect

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
    