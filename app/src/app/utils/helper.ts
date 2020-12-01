export const Helper = {
    autocomplete: {
      exibitName(obj: any): string {
        if (obj) {
          return obj.name ? obj.name : obj;
        }
  
        return '';
      },
  
      prevent(key: string) {
        return key === 'ArrowDown' ||
          key === 'ArrowUp' ||
          key === 'ArrowLeft' ||
          key === 'ArrowRight' ||
          key === 'Enter' ||
          key === 'Escape';
      }
    },
  
    format: {
      number(num: number, digits = 0, showSimbol: boolean = true, showCipher: boolean = false): string {
        const si = [
          { value: 1, symbol: '' },
          { value: 1E3, symbol: ' mil' },
          { value: 1E6, symbol: ' MM' },
          { value: 1E9, symbol: ' B' }
        ];
        let i;
  
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
  
        return this.numberToReal((num / si[i].value), showCipher ? '$' : '', digits) + (showSimbol ? si[i].symbol : '');
      },
  
      thousands(num: number, prefix: string = '$', digits: number = 2, showSimbol: boolean = true): string {
        return this.numberToReal((num / 1000), prefix, digits) + (showSimbol ? ' mil' : '');
      },
  
      million(num: number, prefix: string = '$', digits: number = 2, showSimbol: boolean = true): string {
        return this.numberToReal((num / 1000000), prefix, digits) + (showSimbol ? ' MM' : '');
      },
  
      truncate(value: string, maxLength = 10): string {
        return value && value.length > maxLength ? value.slice(0, maxLength).concat('...') : value;
      },
  
      ignoreDecimal(value: number) {
        return Math.trunc(value);
      },
  
      numberToReal(value: number, prefix: string = '$', digits = 2) {
        if (value == null || isNaN(value)) {
          value = 0;
        }
  
        const numero = value.toFixed(digits).split('.');
        numero[0] = prefix + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
      }
    },
  
    quartile(series: number[], quartileNumber: number = 1): number { // Exclusive quartile
      const values = [NaN, ...series.sort((a, b) => this.compare(a, b, true))];
      const f = quartileNumber * values.length / 4;
      const quartilePosition = Math.floor(f);
      const nextPosition = Math.ceil(f);
      const deltaProportion = f - quartilePosition;
  
      if (quartileNumber > 4 || quartilePosition === 0 || nextPosition >= values.length) {
        return null;
      }
  
      const quartile = values[quartilePosition] + (deltaProportion * (values[nextPosition] - values[quartilePosition]));
      return quartile;
    },
  
    compare(a, b, isAsc = true): number {
      return (a === b ? 0 : this.removeDiacritics(a) < this.removeDiacritics(b) ? -1 : 1) * (isAsc ? 1 : -1);
    },
  
    removeDiacritics(str: any) {
      if (typeof str === 'string') {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
      return str;
    },
  
    array: {
      copy: function (array: Array<any>) {
      const copia = array.map(item => {
        if (typeof(item) === typeof({})) {
          return Object.assign({}, item);
        } else {
          return item;
        }
       });
      return copia;
      },
      uniques: function (array: Array<any>) {
        return array.filter((item, i, ar) => ar.indexOf(item) === i);
      }
    },
  
    numeros: {
      iguais(a, b): boolean {
        return +a.toFixed(5) === +b.toFixed(5);
      },
  
      percentual(a, b): number {
        return +b.toFixed(5) !== 0 ? +a.toFixed(5) / +b.toFixed(5) * 100 : 0;
      }
    },
  
    eventos: {
      opcaoSelecionada(evento): boolean {
        return evento && evento.relatedTarget && Object.values(evento.relatedTarget.classList).includes('mat-option');
      }
    },
  
    scroll: {
      scrollAtElement(element: HTMLElement) {
        if (!element) {
          return;
        }
  
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    }
  };
  