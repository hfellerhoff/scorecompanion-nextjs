export enum Genre {
  Chamber = 'Chamber',
  Keyboard = 'Keyboard',
  Orchestral = 'Orchestral',
  Stage = 'Stage',
  Vocal = 'Vocal',
}
export enum Epoch {
  Medieval = 'Medieval',
  Renaissance = 'Renaissance',
  Baroque = 'Baroque',
  Classical = 'Classical',
  EarlyRomantic = 'Early Romantic',
  Romantic = 'Romantic',
  LateRomantic = 'Late Romantic',
  TwentiethCentury = '20th Century',
  PostWar = 'Post-War',
  TwentyFirstCentury = '21st Century',
}

export interface ShortComposer {
  complete_name: string;
  epoch: Epoch;
  id: string;
  name: string;
}

export interface Composer extends ShortComposer {
  birth: string;
  death: string;
  portrait: string;
}

export interface ShortWork {
  composer: ShortComposer;
  genre: Genre;
  id: string;
  title: string;
}

export interface Work {
  title: string;
  subtitle: string;
  searchterms: string;
  popular: string;
  recommended: string;
  id: string;
  genre: Genre;
}
