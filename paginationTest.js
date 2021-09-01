// var totalPages = prompt("how many total pages?");
// var currentPage = prompt("what current page are you on?");
// console.log("total pages: " + totalPages);
// console.log("current page: " + currentPage);

class Pagination {
  constructor() {
    this.paginationArray = [];
  }

  buildPagination(totalPages, currentPage) {
    // start with the current page
    this.paginationArray.push(createPage(currentPage, true));

    // handle middle conent
    //work left of the currentPage
    if (currentPage - 1 >= 2 && totalPages <= 7) {
      for (var i = currentPage - 1; i >= 1; i--) {
        this.paginationArray.unshift(createPage(i, false));
      }
    } else if (totalPages - currentPage < 1 && currentPage >= 7) {
      for (var i = currentPage - 1; i >= currentPage - 4; i--) {
        this.paginationArray.unshift(createPage(i, false));
      }
      this.paginationArray.unshift(createPage("...", false));
      this.paginationArray.unshift(createPage(1, false));
    } else if (totalPages - currentPage < 2 && currentPage >= 7) {
      for (var i = currentPage - 1; i >= currentPage - 3; i--) {
        this.paginationArray.unshift(createPage(i, false));
      }
      this.paginationArray.unshift(createPage("...", false));
      this.paginationArray.unshift(createPage(1, false));
    } else if (totalPages - currentPage < 3 && currentPage >= 6) {
      for (var i = currentPage - 1; i >= currentPage - 2; i--) {
        this.paginationArray.unshift(createPage(i, false));
      }
      this.paginationArray.unshift(createPage("...", false));
      this.paginationArray.unshift(createPage(1, false));
    } else if (currentPage - 1 > 3) {
      this.paginationArray.unshift(createPage(currentPage - 1, false));
      this.paginationArray.unshift(createPage("...", false));
      this.paginationArray.unshift(createPage(1, false));
    } else if (currentPage - 1 == 3) {
      this.paginationArray.unshift(createPage(currentPage - 1, false));
      this.paginationArray.unshift(createPage(currentPage - 2, false));
      this.paginationArray.unshift(createPage(currentPage - 3, false));
    } else if (currentPage - 1 >= 2) {
      this.paginationArray.unshift(createPage(currentPage - 1, false));
      this.paginationArray.unshift(createPage(currentPage - 2, false));
    } else if (currentPage - 1 >= 1) {
      this.paginationArray.unshift(createPage(currentPage - 1, false));
    } else {
    }
    // work right of the currentPage
    if (totalPages - currentPage > 3 && totalPages <= 7) {
      for (var i = currentPage + 1; i < totalPages; i++) {
        this.paginationArray.push(createPage(i, false));
      }
    } else if (totalPages - currentPage > 3 && currentPage <= 3) {
      for (var i = currentPage + 1; i < 6; i++) {
        this.paginationArray.push(createPage(i, false));
      }
      this.paginationArray.push(createPage("...", false));
    } else if (totalPages - currentPage > 3) {
      this.paginationArray.push(createPage(currentPage + 1, false));
      this.paginationArray.push(createPage("...", false));
    } else if (totalPages - currentPage == 3) {
      this.paginationArray.push(createPage(currentPage + 1, false));
      this.paginationArray.push(createPage(currentPage + 2, false));
      //this.paginationArray.push(createPage(currentPage + 3, false));
    } else if (totalPages - currentPage >= 2) {
      this.paginationArray.push(createPage(currentPage + 1, false));
      this.paginationArray.push(createPage(currentPage + 2, false));
    } else if (totalPages - currentPage > 1) {
      this.paginationArray.push(createPage(currentPage + 1, false));
    } else {
    }
    // handle last number
    if (totalPages != currentPage && totalPages - currentPage != 2) {
      this.paginationArray.push(createPage(totalPages, false));
    }

    // tack on Previous & Next buttons
    if (currentPage != 1) {
      this.paginationArray.unshift(createPage("Previous", false));
    }
    if (currentPage != totalPages) {
      this.paginationArray.push(createPage("Next", false));
    }
  }
}
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

function createPage(pageNo, isCurrent) {
  var pageObject = { content: pageNo, isCurrent: isCurrent };
  return pageObject;
}
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

for (var j = 0; j < scenarios.length; j++) {
  var pager1 = new Pagination();
  pager1.buildPagination(scenarios[j].totalPages, scenarios[j].currentPage);

  var table = document.getElementById("tbody");
  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = table.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  row.insertCell(0).innerHTML =
    pager1.toString() == scenarios[j].expected
      ? '<span style="color: green"><i class="fas fa-check-circle"></i></span>'
      : '<span style="color: red"><i class="fas fa-times-circle"></i></span>';
  row.insertCell(1).innerHTML = scenarios[j].currentPage;
  row.insertCell(2).innerHTML = scenarios[j].totalPages;
  row.insertCell(3).innerHTML = scenarios[j].explanation;
  row.insertCell(4).innerHTML = scenarios[j].expected;
  row.insertCell(5).innerHTML = pager1.toString();
}
