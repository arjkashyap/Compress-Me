#include <iostream>
#include <fstream>
#include <string>
#include <unordered_map>

// Storing the frequency of every character that occurs in the text document.
std::unordered_map<char, int> freqMap;

// The function read the input text document and creates a frequency map
// of every character in the text document
void createFreqMap()
{
}

int main()
{
    std::string line;
    std::ifstream inputFile("sample.txt");
    if (inputFile.is_open())
    {
        while (std::getline(inputFile, line))
        {
            std::cout << line << "\n";
        }
        inputFile.close();
    }
    else
    {
        std::cout << "Unable to read file. " << std::endl;
    }
    int as = '?';
    std::cout << as << std::endl;
    return 0;
}