import * as THREE from 'three';

import { Character } from '../models/3D/environment/characters/character';

export const mainCharacterId: number = 0;

export const characters: Array<Character> = [
  new Character(
    0,
    `Main character`,
    `Main character`,
    -1,
    //-1,
    4,
    false,
    null,
    null,
    null,
    0.2,
    true,
    new THREE.Vector3(0, 0, 0),
    new THREE.Euler(0, 0, 0)
  )
];
