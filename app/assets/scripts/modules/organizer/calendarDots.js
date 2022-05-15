class CalendarDots {
  constructor() {}

  static update(itemGroup) {

    const model = {
      'task': [false, false], //[before, after]
      'event': [false, false],
      'meeting': [false, false],
      'note': [false, false]
    }

    console.log(itemGroup);
  }
}

export default CalendarDots