import ModifierModule from "./ModifierModule";

/**
 * Module that simply acts as a cache object
 * A call to getValue will return the getValue
 * of the cache objects sourceModule.
 *
 * This noise module requires one source module.
 */
export default class Cache extends ModifierModule {
  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(x, y, z);
  }
}
