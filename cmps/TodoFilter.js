import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="todo-filter">
            <input type="text" placeholder="Search todos" v-model="filterBy.txt">
            <select type="dropdown" v-model="filterBy.status">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
            </select>
            <label>
                Sort By:
                <select class="sort-selector" v-model="sortBy.type">
                    <option value="isDone">Status</option>
                    <option value="txt">Text</option>
                    <option value="createdAt">Created at</option>
                </select>
            </label>
            <label>
                Sort Direction:
                <select class="sort-direction-selector" v-model="sortBy.direction">
                    <option value="1">Ascending</option>
                    <option value="-1">Descending</option>
                </select>
            </label>
        </section>
    `,
    data() {
        return {
            sortBy: { type: 'isDone', direction: '-1' },
            filterBy: { txt: '', status: 'all' },
        }
    },
    computed: {
        isDoneFilterClass() {
            if (this.filterBy.isDone) {
                return 'active'
            } else return 'inactive'
        }
    },
    created() {
        this.emitSort = utilService.debounce(() => {
            this.$emit('sort', this.sortBy)
        }, 450)
        this.emitFilter = utilService.debounce(() => {
            this.$emit('filter', this.filterBy)
        }, 450)
    },
    watch: {
        filterBy: {
            handler() {
                this.emitFilter()
            },
            deep: true,
        },
        sortBy: {
            handler() {
                this.emitSort()
            },
            deep: true,
        },
    },
}