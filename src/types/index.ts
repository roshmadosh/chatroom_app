import { Dispatch, SetStateAction } from 'react';

 /**
 *  Type definitions for component state. Used to make propType defintions for child components more DRY.
 */

// custom utility type for defining types for state-setters
export type StateSetters<T> = {
  [property in keyof T as `set${Capitalize<string & property>}`]: StateSetter<T[property]> ;
 };
 // making the default state-setter type def more semantically appealing
 type StateSetter<T> = Dispatch<SetStateAction<T>>


