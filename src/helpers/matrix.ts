export class Matrix {
    public rows: number
    public cols: number

    public data: number[][]

    constructor(rows: number, cols: number) {
        this.rows = rows
        this.cols = cols

        this.data = []
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 2
            }
        }
    }

    static fromArray(arr: number[]) {
        let m = new Matrix(arr.length, 1)
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i]
        }

        return m
    }

    toArray() {
        let result = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.push(this.data[i][j])
            }
        }
        return result
    }

    randomize() {
        return this.data = this.data.map(rows => {
            return rows.map(value => {
                return Math.random() * 2 - 1
            })
        })
    }

    static multiply(m1: Matrix, m2: Matrix) {
        if (m1.cols !== m2.rows) {
            console.error(`Matrix multiplication should have same amount of cols in Matrix A with rows in Matrix B`)
            return undefined
        }

        const result = new Matrix(m1.rows, m2.cols)

        result.data.map((rows, i) => {
            rows.map((cell, j) => {
                let sum = 0
                for (let k = 0; k < m1.cols; k++) {
                    sum += m1.data[i][k] * m2.data[k][j]
                }
                result.data[i][j] = sum
            })
        })

        return result
    }

    multiply(n: number | Matrix): void {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.error('Columns and Rows should be the same')
                return undefined
            }
            this.data = this.data.map((rows, i) => {
                return rows.map((value, j) => {
                    return value * n.data[i][j]
                })
            })

        } else {

            this.data = this.data.map(rows => {
                return rows.map(value => {
                    return value * n
                })
            })
        }
    }

    map(fn: Function): void {
        this.data.forEach((rows, i) => {
            rows.forEach((value, j) => {
                this.data[i][j] = fn(value, i, j)
            })
        })
    }

    static map(m: Matrix, fn: Function): Matrix {
        const result = new Matrix(m.rows, m.cols)
        m.data.forEach((rows, i) => {
            rows.forEach((value, j) => {
                result.data[i][j] = fn(value, i, j)
            })
        })

        return result
    }


    static subtract(m1: Matrix, m2: Matrix): Matrix {
        const result = new Matrix(m1.rows, m1.cols)

        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = m1.data[i][j] - m2.data[i][j]
            }
        }

        return result
    }

    add(n: number | Matrix) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j]
                }
            }
        } else {
            return this.data = this.data.map(rows => {
                return rows.map(value => {
                    return value + n
                })
            })

        }

    }

    static transpose(m: Matrix) {
        const result = new Matrix(m.cols, m.rows)

        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                result.data[i][j] = m.data[j][i]
            }
        }

        return result
    }

    print() {
        if (this.rows === 0 || this.cols === 0) {
            console.error('Cant show matrix with 0 as rows or cols')
        }
        console.table(this.data)
    }

}