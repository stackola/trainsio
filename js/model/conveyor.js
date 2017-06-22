"use strict";
exports.__esModule = true;
var conveyor = (function () {
    function conveyor(t, direction) {
        this.totalTicks = 5;
        this.ticksLeft = this.totalTicks;
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.inputTile = t;
        this.outputTile = null;
    }
    conveyor.prototype.pickup = function () {
        if (this.inputTile.itemStack != null) {
            this.itemStack = this.inputTile.itemStack;
            this.inputTile.itemStack = null;
            // console.log("Conv. picked up item from " + this.inputTile.getLocation());
            return true;
        }
        else {
            // console.log("Conv. trid picking up item from " + this.inputTile.getLocation() + ", but tile was empty.");
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
                    // console.log(this.outputTile.getLocation() + " accepted the itemstack");
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
