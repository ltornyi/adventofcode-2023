# Advent of Code 2023

## Setup

    npm install -D typescript ts-node @types/node

## Run a challenge

    cd day01
    npx ts-node index.ts

## Notes

* Day 8 part 2: a bit annoying. It's not explicit but the problem statement hints: for each starting point the path will have a full cycle after reaching a terminal point. So the problem really wants you to find the least common multiple of those cycle lengths.

* Day 10 part 2: After some research I found the [Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula) to calculate the area of a polygon given by its vertices. [Pick's theorem](https://en.wikipedia.org/wiki/Pick's_theorem) for polygons with integer vertex coordinates expresses the area in terms of the number of integer points inside and on its boundary. We can easily count the number of points on the boundary.

## References

* [Advent of Code](https://adventofcode.com)
* [Solution megathreads](https://www.reddit.com/r/adventofcode/search?q=flair_name%3A%22SOLUTION%20MEGATHREAD%22&restrict_sr=1)