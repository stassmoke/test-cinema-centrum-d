<template>
    <ul v-if="pager.pages && pager.pages.length" class="pagination" :style="ulStyles">
        <li class="page-item first" :class="{'disabled': pager.currentPage === 1}" :style="liStyles">
            <a class="page-link" @click="setPage(1)" :style="aStyles">{{labels.first}}</a>
        </li>
        <li class="page-item previous" :class="{'disabled': pager.currentPage === 1}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage - 1)" :style="aStyles">{{labels.previous}}</a>
        </li>
        <li v-for="page in pager.pages" :key="page" class="page-item page-number" :class="{'active': pager.currentPage === page}" :style="liStyles">
            <a class="page-link" @click="setPage(page)" :style="aStyles">{{page}}</a>
        </li>
        <li class="page-item next" :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage + 1)" :style="aStyles">{{labels.next}}</a>
        </li>
        <li class="page-item last" :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.totalPages)" :style="aStyles">{{labels.last}}</a>
        </li>
    </ul>
</template>

<script>
    // Sorry, no time to come up with a 'bike'

    const defaultLabels = {
        first: 'First',
        last: 'Last',
        previous: 'Previous',
        next: 'Next'
    };

    const defaultStyles = {
        ul: {
            margin: 0,
            padding: 0,
            display: 'inline-block'
        },
        li: {
            listStyle: 'none',
            display: 'inline',
            textAlign: 'center'
        },
        a: {
            cursor: 'pointer',
            padding: '6px 12px',
            display: 'block',
            float: 'left'
        }
    };

    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
            initialPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 5
            },
            maxPages: {
                type: Number,
                default: 5
            },
            labels: {
                type: Object,
                default: () => defaultLabels
            },
            styles: {
                type: Object
            },
            disableDefaultStyles: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                pager: {},
                ulStyles: {},
                liStyles: {},
                aStyles: {}
            }
        },
        created () {
            if (!this.$listeners.changePage) {
                throw 'Missing required event listener: "changePage"';
            }

            if (!this.disableDefaultStyles) {
                this.ulStyles = defaultStyles.ul;
                this.liStyles = defaultStyles.li;
                this.aStyles = defaultStyles.a;
            }

            if (this.styles) {
                this.ulStyles = { ...this.ulStyles, ...this.styles.ul };
                this.liStyles = { ...this.liStyles, ...this.styles.li };
                this.aStyles = { ...this.aStyles, ...this.styles.a };
            }

            if (this.items && this.items.length) {
                this.setPage(this.initialPage);
            }
        },
        methods: {
            paginate( totalItems, currentPage, pageSize, maxPages) {
                let totalPages = Math.ceil(totalItems / pageSize);

                if (currentPage < 1) {
                    currentPage = 1;
                } else if (currentPage > totalPages) {
                    currentPage = totalPages;
                }

                let startPage, endPage;
                if (totalPages <= maxPages) {
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
                    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
                    if (currentPage <= maxPagesBeforeCurrentPage) {
                        startPage = 1;
                        endPage = maxPages;
                    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                        startPage = totalPages - maxPages + 1;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - maxPagesBeforeCurrentPage;
                        endPage = currentPage + maxPagesAfterCurrentPage;
                    }
                }

                let startIndex = (currentPage - 1) * pageSize;
                let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            },
            setPage(page) {
                const { items, pageSize, maxPages } = this;
                console.log('123');

                const pager = this.paginate(items.length, page, pageSize, maxPages);

                const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

                this.pager = pager;

                this.$emit('changePage', pageOfItems);
            }
        }
    }
</script>

<style lang="sass" scoped>
.page-item
    &.active
        .page-link
            border: 1px solid #47535C
            font-weight: 600
</style>