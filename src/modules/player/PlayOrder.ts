import { PlaylistItem } from '../../interfaces';

export class PlayOrder {
  value: number;
  maxValue: number;
  minValue: number;
  constructor(playlist: PlaylistItem[]) {
    this.value = 0;
    this.maxValue = playlist.length - 1;
    this.minValue = 0;
  }

  calculate(
    type: 'increase' | 'decrease' | 'replace',
    currentValue: number,
    maxValue: number,
    minValue: number
  ) {
    switch (type) {
      case 'increase':
        const nextValue = currentValue + 1;
        return nextValue <= maxValue ? nextValue : minValue;
      case 'decrease':
        const prevValue = currentValue - 1;
        return prevValue >= minValue ? prevValue : maxValue;
      default:
        return currentValue;
    }
  }

  update(type: 'increase' | 'decrease' | 'replace', orderForReplace?: number) {
    if (type === 'replace' && orderForReplace !== undefined) {
      this.value = orderForReplace;
    } else {
      this.value = this.calculate(
        type,
        this.value,
        this.maxValue,
        this.minValue
      );
    }
  }
}
