export const CATEGORIES = [
  'All',
  'Part A (C++)',
  'Part B (Python)'
];

export const assignments = [
  {
    id: 1,
    questionNo: "Question 1",
    title: "Student database with dynamic memory and Linear Search (C++)",
    language: "cpp",
    fileName: "01_LinearSearch.cpp",
    question: "Create a student database containing Student ID, Name, and CGPA using dynamic memory allocation. Take input for n students and search for a student by ID using Linear Search.",
    code: `#include <iostream>
#include <string>
#include <limits>
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

    Student* students = new Student[n]; // dynamic allocation
    for (int i = 0; i < n; ++i) {
        cout << "ID, name, CGPA for student " << i + 1 << ": ";
        cin >> students[i].id >> students[i].name >> students[i].cgpa;
    }

    int target;
    cout << "Enter ID to search: ";
    cin >> target;

    int found = -1;
    for (int i = 0; i < n; ++i) {
        if (students[i].id == target) {
            found = i;
            break;
        }
    }

    if (found == -1) cout << "Student not found\\n";
    else cout << "Found: " << students[found].id << " "
              << students[found].name << " "
              << students[found].cgpa << '\\n';

    delete[] students;
    return 0;
}`
  },
  {
    id: 2,
    questionNo: "Question 2",
    title: "Sort student IDs and Binary Search (C++)",
    language: "cpp",
    fileName: "02_BinarySearch.cpp",
    question: "Accept n student IDs dynamically, sort them in ascending order using std::sort, and implement Binary Search to locate a target student ID.",
    code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cout << "Number of student IDs: ";
    cin >> n;

    int* ids = new int[n];
    for (int i = 0; i < n; ++i) cin >> ids[i];

    sort(ids, ids + n);

    cout << "Sorted IDs: ";
    for (int i = 0; i < n; ++i) cout << ids[i] << " ";
    cout << '\\n';

    int key;
    cout << "ID to search: ";
    cin >> key;

    int left = 0, right = n - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (ids[mid] == key) { result = mid; break; }
        if (ids[mid] < key) left = mid + 1;
        else right = mid - 1;
    }

    if (result == -1) cout << "ID not found\\n";
    else cout << "ID found at sorted index " << result << '\\n';

    delete[] ids;
    return 0;
}`
  },
  {
    id: 3,
    questionNo: "Question 3",
    title: "Sort student records by CGPA using Bubble Sort (C++)",
    language: "cpp",
    fileName: "03_BubbleSort.cpp",
    question: "Store student records (ID, name, CGPA) in a dynamically allocated array and sort the records in ascending order of CGPA using Bubble Sort.",
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

    Student* s = new Student[n];
    for (int i = 0; i < n; ++i) {
        cout << "Enter ID, name, CGPA: ";
        cin >> s[i].id >> s[i].name >> s[i].cgpa;
    }

    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (s[j].cgpa > s[j + 1].cgpa) {
                Student temp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    cout << "Students sorted by CGPA (ascending):\\n";
    for (int i = 0; i < n; ++i)
        cout << s[i].id << " " << s[i].name << " " << s[i].cgpa << '\\n';

    delete[] s;
    return 0;
}`
  },
  {
    id: 4,
    questionNo: "Question 4",
    title: "Student ID Binary Search (duplicate of Problem 2 in the handout)",
    language: "cpp",
    fileName: "04_BinarySearchSorted.cpp",
    question: "Implement a standalone binary search algorithm on an already sorted array of student IDs to find the index of a target ID.",
    code: `// Problem 4 repeats Problem 2 in the supplied practical list.
// This standalone version uses binary search on an already sorted array.
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of sorted IDs: ";
    cin >> n;

    int* ids = new int[n];
    cout << "Enter IDs in ascending order: ";
    for (int i = 0; i < n; ++i) cin >> ids[i];

    int key;
    cout << "ID to find: ";
    cin >> key;

    int lo = 0, hi = n - 1, pos = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (ids[mid] == key) { pos = mid; break; }
        if (ids[mid] < key) lo = mid + 1;
        else hi = mid - 1;
    }

    if (pos == -1) cout << "Not found\\n";
    else cout << "Found at index " << pos << '\\n';

    delete[] ids;
    return 0;
}`
  },
  {
    id: 5,
    questionNo: "Question 5",
    title: "Stack ADT using singly linked list (C++)",
    language: "cpp",
    fileName: "05_StackLinkedList.cpp",
    question: "Implement a Stack Abstract Data Type (ADT) using a singly linked list with push, pop, display, and empty checking operations.",
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int value) : data(value), next(nullptr) {}
};

class Stack {
    Node* topNode;
public:
    Stack() : topNode(nullptr) {}

    bool empty() const { return topNode == nullptr; }

    void push(int value) {
        Node* node = new Node(value);
        node->next = topNode;
        topNode = node;
        cout << "Pushed " << value << '\\n';
    }

    void pop() {
        if (empty()) { cout << "Stack underflow\\n"; return; }
        Node* temp = topNode;
        cout << "Popped " << temp->data << '\\n';
        topNode = topNode->next;
        delete temp;
    }

    void display() const {
        if (empty()) { cout << "Stack is empty\\n"; return; }
        cout << "Top -> ";
        for (Node* p = topNode; p != nullptr; p = p->next)
            cout << p->data << " -> ";
        cout << "NULL\\n";
    }

    ~Stack() {
        while (topNode != nullptr) {
            Node* temp = topNode;
            topNode = topNode->next;
            delete temp;
        }
    }
};

int main() {
    Stack st;
    int choice, value;
    do {
        cout << "\\n1.Push 2.Pop 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> value; st.push(value); }
        else if (choice == 2) st.pop();
        else if (choice == 3) st.display();
    } while (choice != 0);
    return 0;
}`
  },
  {
    id: 6,
    questionNo: "Question 6",
    title: "Convert infix expression to postfix (C++)",
    language: "cpp",
    fileName: "06_InfixToPostfix.cpp",
    question: "Convert an infix expression containing single-letter or digit operands and operators (^, *, /, %, +, -) to its equivalent postfix expression using a stack.",
    code: `#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/' || op == '%') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

bool rightAssociative(char op) { return op == '^'; }

int main() {
    string infix, postfix;
    cout << "Enter infix expression (single-letter/digit operands): ";
    cin >> infix;
    stack<char> ops;

    for (char c : infix) {
        if (isalnum(static_cast<unsigned char>(c))) postfix += c;
        else if (c == '(') ops.push(c);
        else if (c == ')') {
            while (!ops.empty() && ops.top() != '(') {
                postfix += ops.top(); ops.pop();
            }
            if (!ops.empty()) ops.pop();
        } else {
            while (!ops.empty() && ops.top() != '(' &&
                   (precedence(ops.top()) > precedence(c) ||
                   (precedence(ops.top()) == precedence(c) && !rightAssociative(c)))) {
                postfix += ops.top(); ops.pop();
            }
            ops.push(c);
        }
    }
    while (!ops.empty()) {
        if (ops.top() != '(') postfix += ops.top();
        ops.pop();
    }
    cout << "Postfix: " << postfix << '\\n';
    return 0;
}`
  },
  {
    id: 7,
    questionNo: "Question 7",
    title: "Convert infix expression to prefix (C++)",
    language: "cpp",
    fileName: "07_InfixToPrefix.cpp",
    question: "Convert an infix expression containing single-character operands to prefix notation using a stack by reversing the expression, swapping parentheses, generating postfix, and reversing the result.",
    code: `#include <iostream>
#include <stack>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/' || c == '%') return 2;
    if (c == '+' || c == '-') return 1;
    return 0;
}

// This version supports single-character operands and valid expressions.
// Reverse the expression, swap parentheses, make postfix, then reverse it.
int main() {
    string infix;
    cout << "Enter infix expression (single-letter/digit operands): ";
    cin >> infix;

    reverse(infix.begin(), infix.end());
    for (char &c : infix) {
        if (c == '(') c = ')';
        else if (c == ')') c = '(';
    }

    string postfix;
    stack<char> ops;

    for (char c : infix) {
        if (isalnum(static_cast<unsigned char>(c))) postfix += c;
        else if (c == '(') ops.push(c);
        else if (c == ')') {
            while (!ops.empty() && ops.top() != '(') {
                postfix += ops.top(); ops.pop();
            }
            if (!ops.empty()) ops.pop();
        } else {
            while (!ops.empty() && ops.top() != '(' &&
                   (prec(ops.top()) > prec(c) ||
                   (prec(ops.top()) == prec(c) && c == '^'))) {
                postfix += ops.top(); ops.pop();
            }
            ops.push(c);
        }
    }
    while (!ops.empty()) { postfix += ops.top(); ops.pop(); }
    reverse(postfix.begin(), postfix.end());
    cout << "Prefix: " << postfix << '\\n';
    return 0;
}`
  },
  {
    id: 8,
    questionNo: "Question 8",
    title: "Circular Queue using array of size 5 (C++)",
    language: "cpp",
    fileName: "08_CircularQueue.cpp",
    question: "Implement a Circular Queue of fixed capacity 5 using an array with enqueue, dequeue, and display operations.",
    code: `#include <iostream>
using namespace std;

class CircularQueue {
    static const int CAP = 5;
    int a[CAP], front, rear, count;
public:
    CircularQueue() : front(0), rear(-1), count(0) {}

    void enqueue(int x) {
        if (count == CAP) { cout << "Queue is full\\n"; return; }
        rear = (rear + 1) % CAP;
        a[rear] = x;
        ++count;
        cout << "Inserted " << x << '\\n';
    }

    void dequeue() {
        if (count == 0) { cout << "Queue is empty\\n"; return; }
        cout << "Removed " << a[front] << '\\n';
        front = (front + 1) % CAP;
        --count;
    }

    void display() const {
        if (count == 0) { cout << "Queue is empty\\n"; return; }
        cout << "Queue: ";
        for (int i = 0; i < count; ++i)
            cout << a[(front + i) % CAP] << " ";
        cout << '\\n';
    }
};

int main() {
    CircularQueue q;
    int choice, x;
    do {
        cout << "\\n1.Enqueue 2.Dequeue 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> x; q.enqueue(x); }
        else if (choice == 2) q.dequeue();
        else if (choice == 3) q.display();
    } while (choice != 0);
    return 0;
}`
  },
  {
    id: 9,
    questionNo: "Question 9",
    title: "BST insertion and inorder/preorder/postorder traversals (Python)",
    language: "python",
    fileName: "09_BSTTraversals.py",
    question: "Construct a Binary Search Tree (BST) by inserting integers (ignoring duplicates) and perform inorder, preorder, and postorder depth-first traversals.",
    code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    # Duplicate rule: ignore duplicate values.
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.key, end=" ")
        inorder(root.right)

def preorder(root):
    if root:
        print(root.key, end=" ")
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.key, end=" ")

values = list(map(int, input("Enter integers separated by spaces: ").split()))
root = None
for value in values:
    root = insert(root, value)

print("Inorder: ", end=""); inorder(root); print()
print("Preorder: ", end=""); preorder(root); print()
print("Postorder: ", end=""); postorder(root); print()`
  },
  {
    id: 10,
    questionNo: "Question 10",
    title: "BST insertion and search (Python)",
    language: "python",
    fileName: "10_BSTSearch.py",
    question: "Construct a Binary Search Tree (BST) from user input values and implement recursive search to check whether a given key exists in the tree.",
    code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root # duplicate keys are ignored

def search(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        return search(root.left, key)
    return search(root.right, key)

root = None
values = list(map(int, input("Enter BST values: ").split()))
for value in values:
    root = insert(root, value)

key = int(input("Enter key to search: "))
print("Key is present" if search(root, key) else "Key is not present")`
  },
  {
    id: 11,
    questionNo: "Question 11",
    title: "Delete a key from BST (Python)",
    language: "python",
    fileName: "11_BSTDelete.py",
    question: "Delete a key from a Binary Search Tree (BST) handling leaf nodes, nodes with one child, and nodes with two children using inorder successor, and display the tree using inorder traversal.",
    code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def min_node(node):
    while node.left:
        node = node.left
    return node

def delete(root, key):
    if root is None:
        return None
    if key < root.key:
        root.left = delete(root.left, key)
    elif key > root.key:
        root.right = delete(root.right, key)
    else:
        if root.left is None: # zero or one child
            return root.right
        if root.right is None:
            return root.left
        successor = min_node(root.right) # two children
        root.key = successor.key
        root.right = delete(root.right, successor.key)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.key, end=" ")
        inorder(root.right)

root = None
for x in map(int, input("Enter BST values: ").split()):
    root = insert(root, x)

key = int(input("Key to delete: "))
root = delete(root, key)
print("Inorder after deletion: ", end="")
inorder(root)
print()`
  },
  {
    id: 12,
    questionNo: "Question 12",
    title: "Find BST depth and display leaf nodes (Python)",
    language: "python",
    fileName: "12_BSTDepthLeaves.py",
    question: "Calculate the maximum depth (number of levels) of a Binary Search Tree and print all the leaf nodes.",
    code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def depth(root):
    if root is None:
        return 0 # depth measured as number of levels; empty tree = 0
    return 1 + max(depth(root.left), depth(root.right))

def leaves(root):
    if root is None:
        return
    if root.left is None and root.right is None:
        print(root.key, end=" ")
        return
    leaves(root.left)
    leaves(root.right)

root = None
for x in map(int, input("Enter BST values: ").split()):
    root = insert(root, x)

print("Depth (number of levels):", depth(root))
print("Leaf nodes: ", end="")
leaves(root)
print()`
  },
  {
    id: 13,
    questionNo: "Question 13",
    title: "Kruskal Minimum Spanning Tree using adjacency-list-style edge list (Python)",
    language: "python",
    fileName: "13_KruskalMST.py",
    question: "Find the Minimum Spanning Tree (MST) of an undirected weighted graph representing campus locations using Kruskal's algorithm with Disjoint Set Union (DSU).",
    code: `# Edges are stored as (weight, source, destination), a compact representation
# of an undirected weighted graph. Replace the sample edges with campus paths.
def kruskal(vertices, edges):
    parent = {v: v for v in vertices}
    rank = {v: 0 for v in vertices}

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra, rb = find(a), find(b)
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

    chosen, total = [], 0
    for weight, u, v in sorted(edges):
        if union(u, v):
            chosen.append((u, v, weight))
            total += weight
            if len(chosen) == len(vertices) - 1:
                break

    if len(chosen) != len(vertices) - 1:
        print("Graph is disconnected; no spanning tree exists.")
    else:
        print("MST edges:")
        for u, v, w in chosen:
            print(f"{u} -- {v}: {w}")
        print("Total weight:", total)

vertices = ["Gate", "Library", "Canteen", "Lab", "Hostel"]
# Example path lengths/weights; edit to match your campus.
edges = [
    (4, "Gate", "Library"),
    (2, "Gate", "Canteen"),
    (5, "Library", "Canteen"),
    (10, "Library", "Lab"),
    (3, "Canteen", "Lab"),
    (7, "Canteen", "Hostel"),
    (6, "Lab", "Hostel"),
]

kruskal(vertices, edges)`
  },
  {
    id: 14,
    questionNo: "Question 14",
    title: "Prim Minimum Spanning Tree using adjacency matrix (Python)",
    language: "python",
    fileName: "14_PrimMST.py",
    question: "Find the Minimum Spanning Tree (MST) of a weighted graph using Prim's algorithm with an adjacency matrix representation.",
    code: `import math

def prim(matrix, start=0):
    n = len(matrix)
    selected = [False] * n
    key = [math.inf] * n
    parent = [-1] * n
    key[start] = 0
    total = 0

    for _ in range(n):
        u = -1
        for i in range(n):
            if not selected[i] and (u == -1 or key[i] < key[u]):
                u = i
        if u == -1 or key[u] == math.inf:
            print("Graph is disconnected; no spanning tree exists.")
            return

        selected[u] = True
        total += key[u]

        for v in range(n):
            weight = matrix[u][v]
            # 0 means no edge; use positive weights for this example.
            if weight > 0 and not selected[v] and weight < key[v]:
                key[v] = weight
                parent[v] = u

    print("MST edges:")
    for v in range(n):
        if parent[v] != -1:
            print(f"{names[parent[v]]} -- {names[v]}: {matrix[parent[v]][v]}")
    print("Total weight:", total)

names = ["Gate", "Library", "Canteen", "Lab", "Hostel"]
# Symmetric matrix; 0 means no direct edge.
matrix = [
    [0, 4, 2, 0, 0],
    [4, 0, 5, 10, 0],
    [2, 5, 0, 3, 7],
    [0, 10, 3, 0, 6],
    [0, 0, 7, 6, 0],
]

prim(matrix)`
  },
  {
    id: 15,
    questionNo: "Question 15",
    title: "Heap Sort ascending (Python)",
    language: "python",
    fileName: "15_HeapSort.py",
    question: "Sort an array of integers in ascending order using Heap Sort by building a max-heap and iteratively extracting elements.",
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
    # Build max heap in O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)
    # Move maximum to the end, one by one
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        heapify(a, end, 0)
    return a

arr = list(map(int, input("Enter integers separated by spaces: ").split()))
print("Sorted:", *heap_sort(arr))`
  },
  {
    id: 16,
    questionNo: "Question 16",
    title: "Merge Sort delivery times (Python)",
    language: "python",
    fileName: "16_MergeSort.py",
    question: "Sort package delivery times in minutes in ascending order using Merge Sort (divide-and-conquer algorithm).",
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
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

times = list(map(int, input("Enter delivery times (minutes): ").split()))
print("Quickest deliveries first:", *merge_sort(times))`
  },
  {
    id: 17,
    questionNo: "Question 17",
    title: "Fractional Knapsack (Python)",
    language: "python",
    fileName: "17_FractionalKnapsack.py",
    question: "Solve the Fractional Knapsack problem using a greedy approach by sorting items by profit-to-weight ratio to maximize total profit within truck capacity.",
    code: `def fractional_knapsack(items, capacity):
    # Each item is (weight, profit). Fractions of items are allowed.
    items = sorted(items, key=lambda item: item[1] / item[0], reverse=True)
    total_profit = 0.0
    chosen = []

    for weight, profit in items:
        if capacity <= 0:
            break
        take = min(weight, capacity)
        fraction = take / weight
        total_profit += profit * fraction
        chosen.append((weight, profit, fraction, take))
        capacity -= take

    print("Selected items (weight, profit, fraction taken, weight loaded):")
    for item in chosen:
        print(item)
    print(f"Maximum profit: {total_profit:.2f}")

n = int(input("Number of parcels: "))
items = []
for i in range(n):
    weight, profit = map(float, input(f"Parcel {i+1} weight and profit: ").split())
    if weight <= 0:
        raise ValueError("Parcel weight must be positive.")
    items.append((weight, profit))

capacity = float(input("Truck capacity: "))
fractional_knapsack(items, capacity)`
  },
  {
    id: 18,
    questionNo: "Question 18",
    title: "Naive String Matching (Python)",
    language: "python",
    fileName: "18_NaiveStringMatching.py",
    question: "Implement the Naive String Matching algorithm to find all starting indices of a pattern occurring in a text string.",
    code: `def naive_search(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0:
        return list(range(n + 1)) # empty pattern matches at every boundary
    matches = []
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            matches.append(i)
    return matches

text = input("Text: ")
pattern = input("Pattern: ")
positions = naive_search(text, pattern)
if positions:
    print("Pattern found at starting indices:", *positions)
else:
    print("Pattern not found")`
  },
  {
    id: 19,
    questionNo: "Question 19",
    title: "BFS shortest path in a grid maze (Python)",
    language: "python",
    fileName: "19_BFSShortestPath.py",
    question: "Find the shortest path from start to goal in a 2D grid maze with obstacles using Breadth-First Search (BFS) and reconstruct the path.",
    code: `from collections import deque

def bfs(grid, start, goal):
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    parent = {start: None}
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while queue:
        r, c = queue.popleft()
        if (r, c) == goal:
            path = []
            cur = goal
            while cur is not None:
                path.append(cur)
                cur = parent[cur]
            return path[::-1]

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            nxt = (nr, nc)
            if (0 <= nr < rows and 0 <= nc < cols and
                grid[nr][nc] != '#' and nxt not in parent):
                parent[nxt] = (r, c)
                queue.append(nxt)

    return None

grid = [
    "....#.",
    ".##...",
    "...#..",
    "#.....",
]

start = (0, 0)
goal = (3, 5)
path = bfs(grid, start, goal)
if path is None:
    print("No path exists")
else:
    print("Shortest path:", path)
    shown = [list(row) for row in grid]
    for r, c in path:
        if (r, c) not in (start, goal):
            shown[r][c] = '*'
    shown[start[0]][start[1]] = 'S'
    shown[goal[0]][goal[1]] = 'G'
    print("Maze (* = path):")
    for row in shown:
        print("".join(row))`
  },
  {
    id: 20,
    questionNo: "Question 20",
    title: "A* search in a grid maze using Manhattan distance (Python)",
    language: "python",
    fileName: "20_AStarSearch.py",
    question: "Find an optimal path in a grid maze with obstacles using the A* Search algorithm with Manhattan distance heuristic.",
    code: `import heapq

def astar(grid, start, goal):
    rows, cols = len(grid), len(grid[0])

    def heuristic(cell):
        return abs(cell[0] - goal[0]) + abs(cell[1] - goal[1])

    open_heap = [(heuristic(start), 0, start)]
    parent = {start: None}
    g_score = {start: 0}
    closed = set()
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while open_heap:
        f, g, current = heapq.heappop(open_heap)
        if current in closed:
            continue
        if current == goal:
            path = []
            cur = goal
            while cur is not None:
                path.append(cur)
                cur = parent[cur]
            return path[::-1]

        closed.add(current)
        r, c = current

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            nxt = (nr, nc)
            if not (0 <= nr < rows and 0 <= nc < cols):
                continue
            if grid[nr][nc] == '#':
                continue

            tentative_g = g_score[current] + 1
            if tentative_g < g_score.get(nxt, float("inf")):
                parent[nxt] = current
                g_score[nxt] = tentative_g
                heapq.heappush(open_heap, (tentative_g + heuristic(nxt),
                                           tentative_g, nxt))
                closed.discard(nxt)

    return None

grid = [
    "....#.",
    ".##...",
    "...#..",
    "#.....",
]

start = (0, 0)
goal = (3, 5)
path = astar(grid, start, goal)
if path is None:
    print("No path exists")
else:
    print("A* path:", path)
    shown = [list(row) for row in grid]
    for r, c in path:
        if (r, c) not in (start, goal):
            shown[r][c] = '*'
    shown[start[0]][start[1]] = 'S'
    shown[goal[0]][goal[1]] = 'G'
    for row in shown:
        print("".join(row))`
  }
];
