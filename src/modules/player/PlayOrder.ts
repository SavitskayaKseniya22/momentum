import { PlaylistItem } from '../../interfaces';
import { calculateNumber } from '../../utils';

export class PlayOrder {
  value: number;
  maxValue: number;
  minValue: number;
  constructor(playlist: PlaylistItem[]) {
    this.value = 0;
    this.maxValue = playlist.length - 1;
    this.minValue = 0;
  }

  update(type: 'increase' | 'decrease' | 'replace', orderForReplace?: number) {
    if (type === 'replace' && orderForReplace !== undefined) {
      this.value = orderForReplace;
    } else {
      this.value = calculateNumber(
        type,
        this.value,
        this.maxValue,
        this.minValue
      );
    }
  }
}
