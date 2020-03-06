* v.2.0.0
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
    
    * update README.md to reflect peer dependency updates
    
