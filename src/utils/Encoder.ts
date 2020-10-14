/* 
    - Frequency map is built for text str
    - Traverse Freq map and add each (char, freq) as Heap Node in the minHeap
    - Repeat while size of minheap == 1
        - Pop two elements from the heap, build NewNode(frequency of node a + freq of node b)
        - Set node a and node b as left and right of NewNode
        - Push NewNode in the Min heap
    - HM Tree is complete
*/
