# USWDS Pagination Rules and Guidance

The [US Web Design System](https://designsystem.digital.gov/components/pagination/) released a Pagination component in version [2.12.0](https://github.com/uswds/uswds/releases/tag/v2.12.0) which provides both HTML markup but also a set of behaviors/ practices to be followed.  This project establishes a javascript module which takes in two inputs, maximum number of pages and current page number, and returns an array representing a proper sequence of page numbes, overflow indicators, and Previous/ Next text.  In order to properly evaluate all scenarios, a visual test suite was established and is available as a GitHub.io page, [https://mvogelgesang.github.io/uswdsPagination/](https://mvogelgesang.github.io/uswdsPagination/).

## Top line USWDS Guidance 

- Display at most, 9 elements which includes Previous, Next, Page Numbers, and Overflow indicators (...)
- If 7 or less pages exist, truncate page number list to equal the number of pages present
- Always display first, last, current, next, and previous page numbers (e.g. [1][...][7][8*][9][...][22])
- Full guidance available at [US Web Design System](https://designsystem.digital.gov/components/pagination/)
