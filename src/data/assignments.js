export const CATEGORIES = [
  'All',
  ...Array.from(new Set([
    "Linear Search + dynamic memory",
    "Binary Search",
    "Bubble Sort (by CGPA)",
    "Binary Search (found / not found)",
    "Stack using linked list",
    "Infix to Postfix (array stack)",
    "Infix to Prefix (array stack)",
    "Circular Queue (size 5)",
    "BST insert + traversals",
    "BST insert + search",
    "BST deletion",
    "BST depth + leaf nodes",
    "Kruskal's MST (adjacency list)",
    "Prim's MST (adjacency matrix)",
    "Heap Sort",
    "Merge Sort (delivery times)",
    "Fractional Knapsack",
    "Naive String Matching",
    "BFS shortest path in maze",
    "A* search in maze"
  ]))
];

export const assignments = [
  {
    id: 1,
    questionNo: "Question 1",
    fileName: "01_LinearSearch.cpp",
    title: "Linear Search + Dynamic Memory",
    topic: "Linear Search + dynamic memory",
    language: "cpp",
    level: "Easy",
    timeComplexity: "O(n)",
    keyConcepts: "Arrays of structs, new/delete, sequential scan",
    question: "Create a student database containing Student ID, Name, and CGPA. Allocate memory dynamically, add student records, and search for a student using ID with Linear Search.",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    int id;
    string name;
    float cgpa;
};

int main() {
    int n;
    cout << "Number of students: ";
    cin >> n;
    Student* students = new Student[n];
    for (int i = 0; i < n; i++) {
        cout << "Enter ID, name and CGPA: ";
        cin >> students[i].id >> students[i].name >> students[i].cgpa;
    }
    int key;
    cout << "Enter ID to search: ";
    cin >> key;
    int i;
    for (i = 0; i < n; i++) {
        if (students[i].id == key) {
            cout << "Found: " << students[i].id << " " << students[i].name << " " << students[i].cgpa << "\\n";
            break;
        }
    }
    if (i == n) cout << "Student not found\\n";
    delete[] students;
    return 0;
}`
  },
  {
    id: 2,
    questionNo: "Question 2",
    fileName: "02_BinarySearch.cpp",
    title: "Binary Search on Student IDs",
    topic: "Binary Search",
    language: "cpp",
    level: "Easy",
    timeComplexity: "O(log n) search",
    keyConcepts: "Sort first, then halve the search range",
    question: "Store student IDs in an array, sort them in ascending order, and implement Binary Search to find a given student ID.",
    code: `#include <iostream>
using namespace std;

int main() {
    int n, searchID, temp;
    int ids[50];
    cout << "Enter number of student IDs: ";
    cin >> n;
    cout << "Enter student IDs: ";
    for (int i = 0; i < n; i++)
        cin >> ids[i];

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (ids[i] > ids[j]) {
                temp = ids[i];
                ids[i] = ids[j];
                ids[j] = temp;
            }
        }
    }

    cout << "Sorted IDs: ";
    for (int i = 0; i < n; i++)
        cout << ids[i] << " ";
    cout << "\\nEnter ID to search: ";
    cin >> searchID;

    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (ids[mid] == searchID) {
            cout << "ID found at index " << mid;
            return 0;
        } else if (searchID < ids[mid])
            high = mid - 1;
        else
            low = mid + 1;
    }
    cout << "ID not found";
    return 0;
}`
  },
  {
    id: 3,
    questionNo: "Question 3",
    fileName: "03_BubbleSort.cpp",
    title: "Bubble Sort by CGPA",
    topic: "Bubble Sort (by CGPA)",
    language: "cpp",
    level: "Easy",
    timeComplexity: "O(n^2)",
    keyConcepts: "Adjacent swaps, sorting structs by a field",
    question: "Store student ID, name, and CGPA. Implement Bubble Sort or Selection Sort to arrange records by CGPA in ascending order.",
    code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    int id;
    string name;
    float cgpa;
};

int main() {
    int n;
    Student s[100];
    cout << "Number of students: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Enter ID, name and CGPA: ";
        cin >> s[i].id >> s[i].name >> s[i].cgpa;
    }

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (s[j].cgpa > s[j + 1].cgpa) {
                Student temp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = temp;
            }
        }
    }

    cout << "Records by CGPA (ascending):\\n";
    for (int i = 0; i < n; i++)
        cout << s[i].id << " " << s[i].name << " " << s[i].cgpa << "\\n";
    return 0;
}`
  },
  {
    id: 4,
    questionNo: "Question 4",
    fileName: "04_BinarySearch.cpp",
    title: "Binary Search (Found / Not Found)",
    topic: "Binary Search (found / not found)",
    language: "cpp",
    level: "Easy",
    timeComplexity: "O(log n) search",
    keyConcepts: "Same as Q2, sorted array required",
    question: "Store student IDs in an array, sort them in ascending order, and implement Binary Search to find a given student ID.",
    code: `#include <iostream>
using namespace std;

int main() {
    int n, searchID, temp;
    int ids[50];
    cout << "Enter number of student IDs: ";
    cin >> n;
    cout << "Enter student IDs: ";
    for (int i = 0; i < n; i++)
        cin >> ids[i];

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (ids[i] > ids[j]) {
                temp = ids[i];
                ids[i] = ids[j];
                ids[j] = temp;
            }
        }
    }

    cout << "Sorted IDs: ";
    for (int i = 0; i < n; i++)
        cout << ids[i] << " ";
    cout << "\\nEnter ID to search: ";
    cin >> searchID;

    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (ids[mid] == searchID) {
            cout << "ID found at index " << mid;
            return 0;
        } else if (searchID < ids[mid])
            high = mid - 1;
        else
            low = mid + 1;
    }
    cout << "ID not found";
    return 0;
}`
  },
  {
    id: 5,
    questionNo: "Question 5",
    fileName: "05_StackLinkedList.cpp",
    title: "Stack using Singly Linked List",
    topic: "Stack using linked list",
    language: "cpp",
    level: "Easy",
    timeComplexity: "O(1) per op",
    keyConcepts: "push, pop, display, underflow check",
    question: "Implement a Stack ADT using a singly linked list with push, pop, and display operations. Handle stack underflow.",
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* topNode = nullptr;

void push(int x) {
    Node* p = new Node{x, topNode};
    topNode = p;
}

void pop() {
    if (topNode == nullptr) {
        cout << "Stack underflow\\n";
        return;
    }
    cout << "Popped: " << topNode->data << "\\n";
    Node* temp = topNode;
    topNode = topNode->next;
    delete temp;
}

void display() {
    if (topNode == nullptr) {
        cout << "Stack is empty\\n";
        return;
    }
    cout << "Stack: ";
    for (Node* p = topNode; p != nullptr; p = p->next)
        cout << p->data << " ";
    cout << "\\n";
}

int main() {
    int choice, x;
    do {
        cout << "1.Push 2.Pop 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> x; push(x); }
        else if (choice == 2) pop();
        else if (choice == 3) display();
    } while (choice != 0);

    while (topNode != nullptr) pop();
    return 0;
}`
  },
  {
    id: 6,
    questionNo: "Question 6",
    fileName: "06_InfixToPostfix.cpp",
    title: "Infix to Postfix Conversion",
    topic: "Infix to Postfix (array stack)",
    language: "cpp",
    level: "Medium",
    timeComplexity: "O(n)",
    keyConcepts: "Operator precedence, parentheses handling",
    question: "Implement a stack using an array and convert a valid infix expression into postfix notation, considering operator precedence and parentheses.",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char st[100];
int top = -1;

int precedence(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return 0;
}

int main() {
    string infix, postfix;
    cout << "Enter infix expression: ";
    cin >> infix;

    for (char c : infix) {
        if (isalnum(c))
            postfix += c;
        else if (c == '(')
            st[++top] = c;
        else if (c == ')') {
            while (top >= 0 && st[top] != '(')
                postfix += st[top--];
            if (top >= 0)
                top--;
        } else {
            while (top >= 0 && st[top] != '(' &&
                   (precedence(st[top]) > precedence(c) ||
                   (precedence(st[top]) == precedence(c) && c != '^')))
                postfix += st[top--];
            st[++top] = c;
        }
    }
    while (top >= 0)
        postfix += st[top--];

    cout << "Postfix expression: " << postfix;
    return 0;
}`
  },
  {
    id: 7,
    questionNo: "Question 7",
    fileName: "07_InfixToPrefix.cpp",
    title: "Infix to Prefix Conversion",
    topic: "Infix to Prefix (array stack)",
    language: "cpp",
    level: "Medium",
    timeComplexity: "O(n)",
    keyConcepts: "Reverse, swap brackets, postfix, reverse again",
    question: "Implement a stack using an array and convert a valid infix expression into prefix notation.",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char stackArray[100];
int top = -1;

void push(char ch) {
    stackArray[++top] = ch;
}

char pop() {
    return stackArray[top--];
}

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

int main() {
    string infix, reversed, postfix, prefix;
    cout << "Enter infix expression: ";
    cin >> infix;

    for (int i = (int)infix.length() - 1; i >= 0; i--)
        reversed += infix[i];

    for (int i = 0; i < (int)reversed.length(); i++) {
        if (reversed[i] == '(')
            reversed[i] = ')';
        else if (reversed[i] == ')')
            reversed[i] = '(';
    }

    for (char ch : reversed) {
        if (isalnum((unsigned char)ch))
            postfix += ch;
        else if (ch == '(')
            push(ch);
        else if (ch == ')') {
            while (top != -1 && stackArray[top] != '(')
                postfix += pop();
            if (top != -1)
                pop();
        } else {
            while (top != -1 && stackArray[top] != '(' &&
                   (precedence(stackArray[top]) > precedence(ch) ||
                   (precedence(stackArray[top]) == precedence(ch) && ch == '^')))
                postfix += pop();
            push(ch);
        }
    }

    while (top != -1)
        postfix += pop();

    for (int i = (int)postfix.length() - 1; i >= 0; i--)
        prefix += postfix[i];

    cout << "Prefix expression: " << prefix;
    return 0;
}`
  },
  {
    id: 8,
    questionNo: "Question 8",
    fileName: "08_CircularQueue.cpp",
    title: "Circular Queue (Size 5)",
    topic: "Circular Queue (size 5)",
    language: "cpp",
    level: "Medium",
    timeComplexity: "O(1) per op",
    keyConcepts: "Modulo indexing, full vs empty conditions",
    question: "Implement a Circular Queue of using an array of size 5 in C++. Write a program to perform Enqueue, Dequeue, and Display operations. Handle full and empty queue conditions.",
    code: `#include <iostream>
using namespace std;

const int SIZE = 5;
int q[SIZE], front = -1, rear = -1;

void enqueue(int x) {
    if ((rear + 1) % SIZE == front) {
        cout << "Queue is full\\n";
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    q[rear] = x;
}

void dequeue() {
    if (front == -1) {
        cout << "Queue is empty\\n";
        return;
    }
    cout << "Removed: " << q[front] << "\\n";
    if (front == rear) front = rear = -1;
    else front = (front + 1) % SIZE;
}

void display() {
    if (front == -1) { cout << "Queue is empty\\n"; return; }
    cout << "Queue: ";
    int i = front;
    while (true) {
        cout << q[i] << " ";
        if (i == rear) break;
        i = (i + 1) % SIZE;
    }
    cout << "\\n";
}

int main() {
    int choice, x;
    do {
        cout << "1.Enqueue 2.Dequeue 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> x; enqueue(x); }
        else if (choice == 2) dequeue();
        else if (choice == 3) display();
    } while (choice != 0);
    return 0;
}`
  },
  {
    id: 9,
    questionNo: "Question 9",
    fileName: "09_BSTTraversal.py",
    title: "BST Insert & Traversals",
    topic: "BST insert + traversals",
    language: "python",
    level: "Easy",
    timeComplexity: "O(h) insert, O(n) traversal",
    keyConcepts: "Inorder / preorder / postorder, duplicate rule",
    question: "Create a BST by inserting integer values. Display inorder, preorder, and postorder traversals. Handle duplicate values according to a defined rule.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

def preorder(root):
    if root:
        print(root.value, end=" ")
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.value, end=" ")

values = list(map(int, input("Enter integers: ").split()))
root = None
for value in values:
    root = insert(root, value)

print("Inorder:", end=" "); inorder(root)
print("\\nPreorder:", end=" "); preorder(root)
print("\\nPostorder:", end=" "); postorder(root)
print()`
  },
  {
    id: 10,
    questionNo: "Question 10",
    fileName: "010_BSTSearch.py",
    title: "BST Insertion & Search",
    topic: "BST insert + search",
    language: "python",
    level: "Easy",
    timeComplexity: "O(h)",
    keyConcepts: "Recursive search using BST property",
    question: "Implement insertion and search operations in a BST. Display whether a given key is present.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def search(root, key):
    if root is None or root.value == key:
        return root is not None
    if key < root.value:
        return search(root.left, key)
    return search(root.right, key)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

key = int(input("Enter key to search: "))
print("Key is present" if search(root, key) else "Key is not present")`
  },
  {
    id: 11,
    questionNo: "Question 11",
    fileName: "011_BSTDelete.py",
    title: "BST Deletion",
    topic: "BST deletion",
    language: "python",
    level: "Medium",
    timeComplexity: "O(h)",
    keyConcepts: "Leaf, one child, two children (inorder successor)",
    question: "Implement deletion of a specified key from a BST, handling leaf nodes, nodes with one child, and nodes with two children.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def delete(root, key):
    if root is None:
        return None
    if key < root.value:
        root.left = delete(root.left, key)
    elif key > root.value:
        root.right = delete(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        successor = root.right
        while successor.left:
            successor = successor.left
        root.value = successor.value
        root.right = delete(root.right, successor.value)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

key = int(input("Enter key to delete: "))
root = delete(root, key)
print("BST after deletion:", end=" ")
inorder(root)
print()`
  },
  {
    id: 12,
    questionNo: "Question 12",
    fileName: "012_BSTDepthLeaves.py",
    title: "BST Depth & Leaf Nodes",
    topic: "BST depth + leaf nodes",
    language: "python",
    level: "Easy",
    timeComplexity: "O(n)",
    keyConcepts: "Recursive height, leaf = no children",
    question: "Find the depth of a BST and display all leaf nodes.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def depth(root):
    if root is None:
        return 0
    return 1 + max(depth(root.left), depth(root.right))

def leaves(root):
    if root:
        if root.left is None and root.right is None:
            print(root.value, end=" ")
        leaves(root.left)
        leaves(root.right)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

print("Depth (number of levels):", depth(root))
print("Leaf nodes:", end=" ")
leaves(root)
print()`
  },
  {
    id: 13,
    questionNo: "Question 13",
    fileName: "013_KruskalMST.py",
    title: "Kruskal's Minimum Spanning Tree",
    topic: "Kruskal's MST (adjacency list)",
    language: "python",
    level: "Medium",
    timeComplexity: "O(E log E)",
    keyConcepts: "Sort edges, Union-Find, cycle avoidance",
    question: "Represent a graph of your college campus using adjacency list. Implement Kruskal's algorithm to find its Minimum Spanning Tree and display selected edges and total weight.",
    code: `def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, rank, a, b):
    ra, rb = find(parent, a), find(parent, b)
    if ra == rb:
        return False
    if rank[ra] < rank[rb]:
        parent[ra] = rb
    elif rank[ra] > rank[rb]:
        parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1
    return True

n = int(input("Number of vertices: "))
names = input("Enter vertex names: ").split()
graph = {name: [] for name in names}
m = int(input("Number of edges: "))
edges = []

for _ in range(m):
    u, v, w = input("Enter edge (u v weight): ").split()
    w = int(w)
    graph[u].append((v, w))
    graph[v].append((u, w))
    edges.append((w, u, v))

parent = {name: name for name in names}
rank = {name: 0 for name in names}
total = 0
selected = []

for w, u, v in sorted(edges):
    if union(parent, rank, u, v):
        selected.append((u, v, w))
        total += w

if len(selected) != n - 1:
    print("Graph is disconnected; no spanning tree exists.")
else:
    print("Selected MST edges:")
    for u, v, w in selected:
        print(u, "-", v, ":", w)
    print("Total weight:", total)`
  },
  {
    id: 14,
    questionNo: "Question 14",
    fileName: "014_PrimMST.py",
    title: "Prim's Minimum Spanning Tree",
    topic: "Prim's MST (adjacency matrix)",
    language: "python",
    level: "Medium",
    timeComplexity: "O(V^2)",
    keyConcepts: "Greedy growth of tree, pick min crossing edge",
    question: "Represent a graph of your college campus using adjacency matrix. Implement Prim's algorithm to find the Minimum Spanning Tree and calculate its total weight.",
    code: `n = int(input("Number of vertices: "))
print("Enter adjacency matrix (0 means no edge):")
graph = [list(map(int, input().split())) for _ in range(n)]

selected = [False] * n
selected[0] = True
edges = []
total = 0

for _ in range(n - 1):
    best = float("inf")
    u = v = -1
    for i in range(n):
        if selected[i]:
            for j in range(n):
                if not selected[j] and graph[i][j] != 0 and graph[i][j] < best:
                    best = graph[i][j]
                    u, v = i, j
    if v == -1:
        print("Graph is disconnected; no spanning tree exists.")
        break
    selected[v] = True
    edges.append((u, v, best))
    total += best
else:
    print("Selected MST edges:")
    for u, v, w in edges:
        print(u, "-", v, ":", w)
    print("Total weight:", total)`
  },
  {
    id: 15,
    questionNo: "Question 15",
    fileName: "015_HeapSort.py",
    title: "Heap Sort Algorithm",
    topic: "Heap Sort",
    language: "python",
    level: "Medium",
    timeComplexity: "O(n log n)",
    keyConcepts: "Build max-heap, heapify, in-place sort",
    question: "Design and implement the Heap Sort algorithm to efficiently sort an array of integers in ascending order. The implementation should be optimized for time and space complexity and should clearly demonstrate the working principles of heap data structures.",
    code: `def heapify(a, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and a[left] > a[largest]:
        largest = left
    if right < n and a[right] > a[largest]:
        largest = right
    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)

def heap_sort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)
    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]
        heapify(a, i, 0)

a = list(map(int, input("Enter integers: ").split()))
heap_sort(a)
print("Sorted array:", *a)`
  },
  {
    id: 16,
    questionNo: "Question 16",
    fileName: "016_MergeSort.py",
    title: "Merge Sort for Delivery Orders",
    topic: "Merge Sort (delivery times)",
    language: "python",
    level: "Medium",
    timeComplexity: "O(n log n)",
    keyConcepts: "Divide and conquer, merge two sorted halves",
    question: "You are given a list of online orders, each with an estimated delivery time in minutes. Write a program to sort these orders using the Merge Sort algorithm so the delivery system can prioritize quicker deliveries first.",
    code: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

times = list(map(int, input("Enter delivery times in minutes: ").split()))
print("Orders by quickest delivery:", *merge_sort(times))`
  },
  {
    id: 17,
    questionNo: "Question 17",
    fileName: "017_FractionalKnapsack.py",
    title: "Fractional Knapsack Strategy",
    topic: "Fractional Knapsack",
    language: "python",
    level: "Easy",
    timeComplexity: "O(n log n)",
    keyConcepts: "Greedy by profit/weight ratio",
    question: "You run a shipping company and need to load a truck with parcels of different weights and profits. The truck has a limited weight capacity. Write a program to choose parcels (even partially) to maximize profit using the Fractional Knapsack strategy.",
    code: `n = int(input("Number of parcels: "))
parcels = []
for i in range(n):
    weight, profit = map(float, input("Enter weight and profit: ").split())
    parcels.append((profit / weight, weight, profit))

capacity = float(input("Truck capacity: "))
parcels.sort(reverse=True)

total_profit = 0
for ratio, weight, profit in parcels:
    if capacity <= 0:
        break
    take = min(weight, capacity)
    total_profit += take * ratio
    capacity -= take

print("Maximum profit:", round(total_profit, 2))`
  },
  {
    id: 18,
    questionNo: "Question 18",
    fileName: "018_NaiveString.py",
    title: "Naive String Pattern Matching",
    topic: "Naive String Matching",
    language: "python",
    level: "Easy",
    timeComplexity: "O(n * m)",
    keyConcepts: "Slide pattern over text, compare substrings",
    question: "A text string text of length n. A pattern string pattern of length m. Find all starting indices i in the text such that the substring text[i:i+m] is exactly equal to the pattern using the Naive String Matching Algorithm approach. Constraints: 0 <= m <= n.",
    code: `text = input("Enter text: ")
pattern = input("Enter pattern: ")
n, m = len(text), len(pattern)
matches = []

for i in range(n - m + 1):
    if text[i:i+m] == pattern:
        matches.append(i)

print("Starting indices:", matches)`
  },
  {
    id: 19,
    questionNo: "Question 19",
    fileName: "019_BFSShortestPath.py",
    title: "Grid Shortest Path using BFS",
    topic: "BFS shortest path in maze",
    language: "python",
    level: "Medium",
    timeComplexity: "O(rows * cols)",
    keyConcepts: "Queue, parent map, path reconstruction",
    question: "Represent a small maze as a two-dimensional grid containing free cells and obstacles. Use Breadth-First Search (BFS) to find the shortest path from a start cell to a goal cell. Display the path or report that no path exists.",
    code: `from collections import deque

maze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
]

start = (0, 0)
goal = (3, 3)
rows, cols = len(maze), len(maze[0])
queue = deque([start])
parent = {start: None}

while queue:
    r, c = queue.popleft()
    if (r, c) == goal:
        break
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        nr, nc = r + dr, c + dc
        cell = (nr, nc)
        if (0 <= nr < rows and 0 <= nc < cols and
            maze[nr][nc] == 0 and cell not in parent):
            parent[cell] = (r, c)
            queue.append(cell)

if goal not in parent:
    print("No path exists")
else:
    path = []
    cell = goal
    while cell is not None:
        path.append(cell)
        cell = parent[cell]
    path.reverse()
    print("Shortest path:", path)
    print("Path length (moves):", len(path) - 1)`
  },
  {
    id: 20,
    questionNo: "Question 20",
    fileName: "020_AStarSearch.py",
    title: "Grid Shortest Path using A* Search",
    topic: "A* search in maze",
    language: "python",
    level: "Hard",
    timeComplexity: "worst case O(b^d)",
    keyConcepts: "Priority queue, g+h cost, Manhattan heuristic",
    question: "Implement A* search for a small grid maze using Manhattan distance as the heuristic. Display the path from start to goal.",
    code: `import heapq

maze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
]

start = (0, 0)
goal = (3, 3)
rows, cols = len(maze), len(maze[0])

def heuristic(cell):
    return abs(cell[0] - goal[0]) + abs(cell[1] - goal[1])

pq = [(heuristic(start), 0, start)]
parent = {start: None}
cost = {start: 0}

while pq:
    _, g, current = heapq.heappop(pq)
    if g != cost[current]:
        continue
    if current == goal:
        break
    r, c = current
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        nr, nc = r + dr, c + dc
        nxt = (nr, nc)
        if (0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] == 0):
            new_cost = g + 1
            if new_cost < cost.get(nxt, float("inf")):
                cost[nxt] = new_cost
                parent[nxt] = current
                heapq.heappush(pq, (new_cost + heuristic(nxt), new_cost, nxt))

if goal not in parent:
    print("No path exists")
else:
    path = []
    cell = goal
    while cell is not None:
        path.append(cell)
        cell = parent[cell]
    path.reverse()
    print("Path from start to goal:", path)`
  }
];
