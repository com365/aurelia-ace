System.register(["aurelia-framework", "brace", "brace/ext/searchbox", "brace/mode/css", "brace/mode/html", "brace/mode/javascript", "brace/theme/textmate", "js-beautify"], function (_export) {
  "use strict";

  var bindable, noView, customElement, processContent, ace, beautify, js_beautify, css_beautify, html_beautify, AceEditor;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === "function") { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
    }, function (_brace) {
      ace = _brace["default"];
    }, function (_braceExtSearchbox) {}, function (_braceModeCss) {}, function (_braceModeHtml) {}, function (_braceModeJavascript) {}, function (_braceThemeTextmate) {}, function (_jsBeautify) {
      beautify = _jsBeautify["default"];
    }],
    execute: function () {
      js_beautify = beautify.js_beautify;
      css_beautify = beautify.css_beautify;
      html_beautify = beautify.html_beautify;

      AceEditor = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(AceEditor, [{
          key: "value",
          decorators: [bindable],
          initializer: function initializer() {
            return "";
          },
          enumerable: true
        }], [{
          key: "setOptions",
          value: function setOptions(options) {
            AceEditor.options = Object.assign(AceEditor.options, options);
          }
        }, {
          key: "options",
          value: {
            showPrintMargin: false,
            beautify: true,
            mode: 'javascript',
            theme: 'textmate'
          },
          enumerable: true
        }, {
          key: "uid",
          value: 1,
          enumerable: true
        }, {
          key: "inject",
          value: [Element],
          enumerable: true
        }], _instanceInitializers);

        function AceEditor(element) {
          _classCallCheck(this, _AceEditor);

          _defineDecoratedPropertyDescriptor(this, "value", _instanceInitializers);

          this.editor = null;
          this.options = null;

          this.element = element;
          this._uid = ++AceEditor.uid;
        }

        _createDecoratedClass(AceEditor, [{
          key: "bind",
          value: function bind() {}
        }, {
          key: "attached",
          value: function attached() {
            this.id = "ace-editor-" + this._uid;
            this.element.setAttribute("id", this.id);

            if (!this.value && this.element.innerHTML) this.element.innerHTML = dedent(this.element.innerHTML).trim();

            var e = this.editor = ace.edit(this.id);

            e.$blockScrolling = Infinity;
            ace.config.set("basePath", "/node_modules/brace/");
            this.updateOptions(this.options || Object.assign({}, AceEditor.options));
            if (this.value) {
              this.valueChanged(this.value);
            }
          }
        }, {
          key: "setValue",
          value: function setValue(v) {
            this.value = v;
            this.valueChanged(v);
            return this;
          }
        }, {
          key: "getValue",
          value: function getValue() {
            return this.editor.getValue();
          }
        }, {
          key: "valueChanged",
          value: function valueChanged(value) {
            if (this.editor) {
              this.value = this._parseValue(this.value);
              this.editor.setValue(this.value, 1);
            }
          }
        }, {
          key: "setOptions",
          value: function setOptions(options) {
            this.options = Object.assign({}, AceEditor.options, options);
            this.updateOptions(this.options);
            return this;
          }
        }, {
          key: "updateOptions",
          value: function updateOptions(options) {
            if (!this.editor) return;

            if (!options.lint) {
              this.editor.session.setUseWorker(false);
            } else {
              this.editor.session.setUseWorker(true);
            }

            if (options.mode) options.mode = "ace/mode/" + options.mode;
            if (options.theme) options.theme = "ace/theme/" + options.theme;

            delete options.beautify;
            delete options.lint;

            this.editor.setOptions(options);
          }
        }, {
          key: "_parseValue",
          value: function _parseValue(obj) {
            if (typeof obj == "object") obj = JSON.stringify(obj);
            var o = this.options;
            if (o.beautify) obj = this._beautify(obj, o.mode);
            return obj;
          }
        }, {
          key: "_beautify",
          value: function _beautify(code, language) {
            if (!code) return null;

            code = code.split('\n').map(function (l) {
              return l.trim();
            }).join('\n');

            switch (language) {
              case 'js':
              case 'javascript':
                code = js_beautify(code);
                break;
              case 'css':
              case 'less':
                code = css_beautify(code);
                break;
              case 'html':
              case 'markup':
                code = escapeHtml(html_beautify(unescapeHtml(code)));
                break;
            }
            return code;
          }
        }], null, _instanceInitializers);

        var _AceEditor = AceEditor;
        AceEditor = processContent(false)(AceEditor) || AceEditor;
        AceEditor = customElement('ace')(AceEditor) || AceEditor;
        AceEditor = noView(AceEditor) || AceEditor;
        return AceEditor;
      })();

      _export("AceEditor", AceEditor);
    }
  };
});
//# sourceMappingURL=ace.js.map
