/// <reference path="../../def/backbone.d.ts" />

import Backbone = require('backbone');
import Model = require('core/Model');

class View<T extends Model> extends Backbone.View<T> {
    constructor(options?:Backbone.ViewOptions<T>) {
        super(options);

        this.setElement($.parseHTML(this.html()));
        this.injectCss();
    }

    private injectCss() {
        var constructorName = this.constructor.toString().match(/\s(.*)\(/)[1];

        if (!View[constructorName]) {
            var css = this.css();
            var node = document.createElement('style');
            node.type = "text/css";
            node.innerHTML = css;
            document.body.appendChild(node);

            View[constructorName] = true;
        }
    }

    protected toggleModifier(modifier:string, toggle:boolean) {
        var modifierClass = this.el.classList[0] + '_' + modifier;

        if (toggle) {
            this.el.classList.add(modifierClass);
        } else {
            this.el.classList.remove(modifierClass);
        }
    }

    render() {
        this.$el.html(this.html());

        return this;
    }

    attachTo(el:HTMLElement) {
        el.appendChild(this.el);
    }

    html() {
        return '<div></div>';
    }

    css() {
        return '';
    }
}

export = View;