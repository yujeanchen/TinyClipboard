/*
TinyClipboard v1
https://github.com/yujeanchen/TinyClipboard
MIT License
Copyright (c) 2018 Yu-Jean Chen
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.TinyClipboard = factory());
}(this, function () {
    "use strict";
    var clipboard = function (options) {
        var defaults = {
            format: "html",
            content: "",
            button: null,
            target: null
        }
            , settings
            , msg = false;
        var execCopy = function () {
            var successful = false;
            try {
                successful = document.execCommand("copy");
            } catch (err) {
                console.log(err);
            }
            return successful;
        };

        var select = function (el, selection, selectContent) {
            var range = document.createRange();
            if (selectContent === true) {
                range.selectNodeContents(el);
            } else {
                range.selectNode(el);
            }
            selection.removeAllRanges();
            selection.addRange(range);
            return selection;
        };

        var createTmpDiv = function () {
            var input = document.createElement("div");
            input.style.position = "absolute";
            input.style.left = "-9999px";
            input.setAttribute("contentEditable", true);
            var contents = {
                "html": function () { input.innerHTML = settings.content },
                "text": function () { input.innerText = settings.content }
            }
            var setContent = (contents[settings.format] || function () { input.innerHTML = settings.content })();
            return input;
        };

        var bindEvent = function (btn) {
            var button = document.getElementById(btn);
            button != null ? button.addEventListener('click', copy) : console.log("Could not find button " + btn);
        };

        var extendDefaults = function (properties) {
            var source = defaults
                , property
                , error = "";
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    if (typeof properties[property] === "string") {
                        source[property] = properties[property];
                    } else {
                        error += property + " must be a string. ";
                    }
                }
            }
            if (error != "") { console.log(error); }
            return error !== "" ? source : defaults;
        };

        var copy = function () {
            var sel = window.getSelection();
            if (settings.target == null && settings.content !== "") {
                var element = createTmpDiv()
                    , body = document.body;
                body.appendChild(element);
                sel = select(element, sel, true);
                msg = execCopy();
                sel.deleteFromDocument();
                body.removeChild(element);
            } else if (settings.target !== null && settings.content == "") {
                var element = document.getElementById(settings.target);
                if (element.tagName.toLowerCase() == "input" || element.tagName.toLowerCase() == "textarea") {
                    element.select();
                } else {
                    sel = select(element, sel, false);
                }
                msg = execCopy();
                sel.removeAllRanges();
            } else {
                console.log("target and content options can't be used together")
            }
        };

        var init = function (para) {
            settings = extendDefaults(para);
            if (settings.button !== null) { bindEvent(settings.button); }
        };

        this.message = function () {
            return msg;
        };

        this.destroy = function () {
            document.getElementById(settings.button).removeEventListener('click', copy, false);
            settings = defaults;
            msg = false;
        };

        init(options);
    }

    return clipboard;

}));
