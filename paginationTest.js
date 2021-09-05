function testPagination() {
  var totalPages = document.getElementById("totalPages").value;
  var currentPage = document.getElementById("currentPage").value;
  var testPagination = new Pagination(totalPages, currentPage);
  testPagination.buildPagination();
  document.getElementById("testResult").innerHTML = testPagination.toString();
}

class Pagination {
  /**
   * Constructs a pagination class.
   * @param {number} totalPages total number of pages in the set
   * @param {number} currentPage current page number
   * @param {number} maxSlots=7 maximum number of slots to display
   * @param {string} overflowIndicator="..." placeholder to indicate that page numbers are not displayed
   */
  constructor(
    totalPages,
    currentPage,
    maxSlots = 7,
    overflowIndicator = "..."
  ) {
    this.maxSlots = maxSlots;
    this.overflowIndicator = overflowIndicator;
    this.magicNumber = Math.round(this.maxSlots / 2);
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.paginationArray = [];
    this.slots;
    console.log(
      `New Pagination initialized...\nTotal Pages: ${this.totalPages}\nCurrent Page: ${this.currentPage}`
    );
  }

  /**
   * Constructs the dataset
   */
  buildPagination() {
    this.calculateNoSlots();

    this.createSlots();

    this.fillSlots();

    this.placePrevNext();
  }

  /**
   * Determines the number of slots to create for the pagination array. USWDS guidance says not to create excess slots. If  total slots are less than the max number of slots, just create the total number.
   */
  calculateNoSlots() {
    this.slots =
      this.totalPages <= this.maxSlots ? this.totalPages : this.maxSlots;
  }

  /**
   * Creates an empty array with a set number of slots
   */
  createSlots() {
    for (var i = 0; i < this.slots; i++) {
      this.paginationArray.push("");
    }
  }

  /**
   * Inserts a page at a given index number
   * @param {number} index Array location where value should be inserted
   * @param {(number|string)} pageNo Number or overflow indicator of the page that is being created
   * @param {boolean} isCurrent Denotes whether or not page number is current
   * @param {boolean} isLast Denotes whether or not page number is the last page
   */
  fillSlot(index, pageNo, isCurrent, isLast = false) {
    this.paginationArray[index] = this.createPage(pageNo, isCurrent, isLast);
  }

  /**
   * Complets the body of the pagination component page numbers and overflow indicators.
   */
  fillSlots() {
    // if total pages is less than 7, just count upwards from 1 and denote current page
    if (this.totalPages <= 7) {
      for (var i = 0; i < this.totalPages; i++) {
        this.fillSlot(
          i,
          i + 1,
          this.currentPage - 1 == i ? true : false,
          i == this.totalPages ? true : false
        );
      }
    }
    // more than 4 from first and last page, the current page must land in the middle slot (4)
    else if (
      this.currentPage > this.magicNumber &&
      this.totalPages - this.currentPage >= this.magicNumber
    ) {
      this.fillSlot(0, 1, false);
      this.fillSlot(1, this.overflowIndicator, false);
      this.fillSlot(2, this.currentPage - 1, false);
      this.fillSlot(this.magicNumber - 1, this.currentPage, true);
      this.fillSlot(4, Number(this.currentPage) + 1, false);
      this.fillSlot(5, this.overflowIndicator, false);
      this.fillSlot(6, this.totalPages, false, true);
    }
    // within 4 of the first page
    else if (this.currentPage <= this.magicNumber) {
      for (var i = 0; i <= 4; i++) {
        this.fillSlot(i, i + 1, this.currentPage - 1 == i ? true : false);
      }
      this.fillSlot(5, this.overflowIndicator, false);
      this.fillSlot(6, this.totalPages, false, true);
    }
    // within 4 of the last page
    else if (this.totalPages - this.currentPage <= this.magicNumber) {
      this.fillSlot(0, 1, false);
      this.fillSlot(1, this.overflowIndicator, false);
      for (
        var index = 2, pageNo = this.totalPages - 4;
        index <= 6;
        index++, pageNo++
      ) {
        this.fillSlot(
          index,
          pageNo,
          this.currentPage == pageNo ? true : false,
          pageNo == this.totalPages ? true : false
        );
      }
    }
  }

  /**
   * Pushes or unshifts Next/Previous page to pagination set
   */
  placePrevNext() {
    if (this.currentPage != 1) {
      this.paginationArray.unshift(this.createPage("Previous", false));
    }
    if (this.currentPage != this.totalPages) {
      this.paginationArray.push(this.createPage("Next", false));
    }
  }

  /**
   * Creates a page object
   * @param {number} pageNo Page number
   * @param {boolean} isCurrent Denotes if page number is the current page
   * @param {boolean} isLast Denotes if this is the last page in the set
   * @return {Object} pageObject
   */
  createPage(pageNo, isCurrent, isLast = false) {
    var type = "";
    if (typeof pageNo == "number") {
      type = "Page Number";
    } else if (pageNo == this.overflowIndicator) {
      type = "Overflow";
      // if not a number or overflow, just use pageNo contents
    } else {
      type = pageNo;
    }
    var pageObject = {
      content: pageNo,
      isCurrent: isCurrent,
      type: type,
      isLast: isLast,
    };
    return pageObject;
  }
}

/**
 * Prints a string representation of all slots in a pagination array
 * @return {string}
 */
Pagination.prototype.toString = function paginationToString() {
  var outputString = "";
  for (var i = 0; i < this.paginationArray.length; i++) {
    var tmp = this.paginationArray[i].isCurrent
      ? this.paginationArray[i].content + "*"
      : this.paginationArray[i].content;
    outputString += "[" + tmp + "]";
  }
  return outputString;
};

var scenarios = [
  {
    totalPages: 1,
    currentPage: 1,
    expected: "[1*]",
    explanation: "",
  },
  {
    totalPages: 2,
    currentPage: 2,
    expected: "[Previous][1][2*]",
    explanation: "",
  },
  {
    totalPages: 3,
    currentPage: 1,
    expected: "[1*][2][3][Next]",
    explanation: "Remove extra slots if there are fewer than 7 pages.",
  },
  {
    totalPages: 3,
    currentPage: 2,
    expected: "[Previous][1][2*][3][Next]",
    explanation:
      "A three-page set shows three pages. Slot two is current. There is a 'previous' link preceding the items. There is a 'next' link following the items.",
  },
  {
    totalPages: 3,
    currentPage: 3,
    expected: "[Previous][1][2][3*]",
    explanation:
      "A three-page set shows three pages. Page 3 is current. There is a 'previous' link preceding the items. There is no 'next' link.",
  },
  {
    totalPages: 7,
    currentPage: 1,
    expected: "[1*][2][3][4][5][6][7][Next]",
    explanation: "Remove extra slots if there are fewer than 7 pages.",
  },
  {
    totalPages: 7,
    currentPage: 2,
    expected: "[Previous][1][2*][3][4][5][6][7][Next]",
    explanation:
      "A seven-page set shows seven pages. Page 2 is current. There are 'previous' and 'next' links bookending the set.",
  },
  {
    totalPages: 8,
    currentPage: 1,
    expected: "[1*][2][3][4][5][...][8][Next]",
    explanation:
      "A eight-page set. Page 1 is the current page. Instance shows pages 1 to 5 in slots 1 to 5. Slot 6 is overflow. Slot 7 page 8.",
  },
  {
    totalPages: 8,
    currentPage: 2,
    expected: "[Previous][1][2*][3][4][5][...][8][Next]",
    explanation:
      "A eight-page set. Page 2 is the current page. Instance shows pages 1 to 5 in slots 1 to 5. Slot 6 is overflow. Slot 7 page 8.",
  },
  {
    totalPages: 8,
    currentPage: 3,
    expected: "[Previous][1][2][3*][4][5][...][8][Next]",
    explanation:
      "A eight-page set. Page 3 is the current page. Instance shows pages 1 to 5 in slots 1 to 5. Slot 6 is overflow. Slot 7 page 8.",
  },
  {
    totalPages: 8,
    currentPage: 4,
    expected: "[Previous][1][2][3][4*][5][...][8][Next]",
    explanation:
      "A eight-page set shows pages 1 to 5 in slots 1 to 5. Slot 4 is current. Slot 6 shows an overflow indicator. Slot 7 shows page 8.",
  },
  {
    totalPages: 8,
    currentPage: 5,
    expected: "[Previous][1][...][4][5*][6][7][8][Next]",
    explanation:
      "A eight-page set. Page 5 is the current page. Instance shows page 1 in Slot 1. Slot 2 is overflow. Pages 4 to 8 appear in slots 3 to 7.",
  },
  {
    totalPages: 8,
    currentPage: 6,
    expected: "[Previous][1][...][4][5][6*][7][8][Next]",
    explanation:
      "A eight-page set. Page 6 is the current page. Instance shows page 1 in Slot 1. Slot 2 is overflow. Pages 4 to 8 appear in slots 3 to 7.",
  },
  {
    totalPages: 8,
    currentPage: 7,
    expected: "[Previous][1][...][4][5][6][7*][8][Next]",
    explanation:
      "An eight-page set. Page 7 is the current page. Instance shows page 1 in slot 1. Slot 2 is overflow, pages 4 to 8 appear in slots 3 to 7.",
  },
  {
    totalPages: 8,
    currentPage: 8,
    expected: "[Previous][1][...][4][5][6][7][8*]",
    explanation:
      "An eight-page set. Page 8 is current page. Instance shows page 1 in Slot 1. Slot 2 is overflow. Pages 4 to 8 appear in slots 3 to 7.",
  },
  {
    totalPages: 9,
    currentPage: 5,
    expected: "[Previous][1][...][4][5*][6][...][9][Next]",
    explanation:
      "A nine-page set. Page 5 is the current page. Instance shows page 1 in Slot 1. Slot 2 is overflow. Slots 3 to 5 contain Pages 4, 5, and 6. Slot 6 is overflow. Slot 7 is page 9.",
  },
  {
    totalPages: 25,
    currentPage: 5,
    expected: "[Previous][1][...][4][5*][6][...][25][Next]",
    explanation:
      "A large page set (>10). Page 5 is the current page. Instance shows page 1 in Slot 1. Slot 2 is overflow. Slots 3 to 5 contain Pages 4, 5, and 6. Slot 6 is overflow. Slot 7 is page 25.",
  },

  {
    totalPages: 25,
    currentPage: 23,
    expected: "[Previous][1][...][21][22][23*][24][25][Next]",
    explanation: "",
  },
  {
    totalPages: 25,
    currentPage: 24,
    expected: "[Previous][1][...][21][22][23][24*][25][Next]",
    explanation: "",
  },
  {
    totalPages: 25,
    currentPage: 25,
    expected: "[Previous][1][...][21][22][23][24][25*]",
    explanation: "",
  },
];

/// RUN TESTS
for (var j = 0; j < scenarios.length; j++) {
  var pagerRef = new Pagination(
    scenarios[j].totalPages,
    scenarios[j].currentPage
  );
  pagerRef.buildPagination();
  var table = document.getElementById("tbody");
  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = table.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  row.insertCell(0).innerHTML =
    pagerRef.toString() == scenarios[j].expected
      ? '<span style="color: green"><i class="fas fa-check-circle"></i></span>'
      : '<span style="color: red"><i class="fas fa-times-circle"></i></span>';
  row.insertCell(1).innerHTML = scenarios[j].currentPage;
  row.insertCell(2).innerHTML = scenarios[j].totalPages;
  row.insertCell(3).innerHTML = scenarios[j].explanation;
  row.insertCell(4).innerHTML = scenarios[j].expected;
  row.insertCell(5).innerHTML = pagerRef.toString();
}
