var lasso = require('../');

var EventEmitter = require('events').EventEmitter;

var LassoRenderContext = function(out) {
    LassoRenderContext.$super.call(this);

    this._waitFor = [];
    this.data = {};
    this.out = out;
};

LassoRenderContext.prototype = {
    onBeforeSlot: function(slotName, cb) {
        this.on('beforeSlot.' + slotName, cb);
    },

    onAfterSlot: function(slotName, cb) {
        this.on('afterSlot.' + slotName, cb);
    },

    emitBeforeSlot: function(slotName, context) {
        this.emit('beforeSlot.' + slotName, {
            context: context,
            slotName: slotName
        });
    },

    emitAfterSlot: function(slotName, context) {
        this.emit('afterSlot.' + slotName, {
            context: context,
            slotName: slotName
        });
    },

    waitFor: function(promise) {
        if (!promise) {
            throw new Error('Invalid waitFor promise');
        }

        if (Array.isArray(promise)) {
            this._waitFor = this._waitFor.concat(promise);
        }
        else {
            this._waitFor.push(promise);
        }
    },

    getWaitFor: function() {
        return this._waitFor;
    },

    getLasso: function() {
        return this.data.lasso || this.out.global.lasso || lasso.defaultLasso;
    },

    getLassoConfig: function() {
        var theLasso = this.getLasso();
        return theLasso.config;
    }
};

require('raptor-util').inherit(LassoRenderContext, EventEmitter);

module.exports = LassoRenderContext;