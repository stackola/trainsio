"use strict";
exports.__esModule = true;
var shortid = require('shortid');
var conveyor = (function () {
    function conveyor(t, direction, totalTicks) {
        if (totalTicks === void 0) { totalTicks = 20; }
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.inputTile = t;
        this.ticksLeft = totalTicks;
        this.totalTicks = totalTicks;
        this.shortid = shortid.generate();
        this.direction = direction;
        if (this.inputTile.getNeighbors().has(direction)) {
            this.outputTile = this.inputTile.getNeighbors().get(direction);
            // console.log("Set output tile to " + this.outputTile.localPosition.getString());
        }
    }
    conveyor.prototype.getGamestate = function () {
        var obj = {
            totalTicks: this.totalTicks,
            ticksLeft: this.ticksLeft,
            hasItem: this.itemStack != null,
            direction: this.direction
        };
        if (obj.hasItem) {
            obj["item"] = this.itemStack.getGamestate();
        }
        return obj;
    };
    conveyor.prototype.pickup = function () {
        if (this.inputTile.itemStack != null) {
            this.itemStack = this.inputTile.itemStack;
            this.inputTile.itemStack = null;
            console.log("Conv. picked up item from " + this.inputTile.localPosition.getString());
            return true;
        }
        else {
            // console.log("Conv. trid picking up item from " + this.inputTile.localPosition.getString() + ", but tile was empty.");
            return false;
        }
    };
    conveyor.prototype._tick = function () {
        if (this.itemStack != null) {
            // we have an item
            this.ticksLeft--;
            if (this.ticksLeft == 0) {
                // Done ticking. drop object on next tile. potentially pick up item from input tile.
                this.ticksLeft = this.totalTicks;
                // console.log("Conveyor done moving! looking to dropoff");
                if (this.outputTile != null && this.outputTile.receiveItemStack(this.itemStack) == true) {
                    console.log(this.outputTile.localPosition.getString() + " accepted the itemstack");
                    this.itemStack = null;
                }
                else {
                    // console.log("tile has not accepted the item stack. trying again next tick");
                    this.ticksLeft = 1;
                }
            }
        }
        else {
            // no item. pick one up if possible
            // console.log("conveyor has no item");
            this.pickup();
        }
    };
    return conveyor;
}());
exports["default"] = conveyor;
