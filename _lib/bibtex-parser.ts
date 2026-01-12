/**
 * BibTeX Entry interface representing a parsed bibliographic entry
 */
export interface BibtexEntry {
  type: string;
  citationKey: string;
  title?: string;
  author?: string;
  formattedAuthors?: Array<{ name: string; isHighlighted: boolean }>;
  year?: string;
  journal?: string;
  booktitle?: string;
  pages?: string;
  volume?: string;
  number?: string;
  publisher?: string;
  organization?: string;
  doi?: string;
  url?: string;
  [key: string]: any;
}

/**
 * BibTeX Parser class for parsing .bib files
 */
export class BibtexParser {
  /**
   * Parse BibTeX content string into an array of entries
   * @param content - The raw BibTeX file content
   * @returns Array of parsed BibTeX entries
   */
  static parse(content: string): BibtexEntry[] {
    const entries: BibtexEntry[] = [];
    const entryPattern = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
    
    const matches: Array<{
      type: string;
      citationKey: string;
      startIndex: number;
      contentStart: number;
    }> = [];
    
    // First pass: find all entry starts
    let match;
    while ((match = entryPattern.exec(content)) !== null) {
      matches.push({
        type: match[1],
        citationKey: match[2],
        startIndex: match.index,
        contentStart: match.index + match[0].length,
      });
    }
    
    // Second pass: process each entry
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const next = matches[i + 1];
      
      // Find the end of this entry (next @ or end of file)
      const endIndex = next ? next.startIndex : content.length;
      const entryContent = content.substring(current.contentStart, endIndex);
      
      // Find the closing brace for this entry by counting braces
      const actualEnd = this.findClosingBrace(entryContent);
      const fieldsContent = entryContent.substring(0, actualEnd);
      
      const entry: BibtexEntry = {
        type: current.type.toLowerCase(),
        citationKey: current.citationKey.trim(),
      };
      
      // Parse all fields in this entry
      this.parseFields(fieldsContent, entry);
      
      entries.push(entry);
    }
    
    return entries;
  }

  /**
   * Find the position of the closing brace for a BibTeX entry
   * @param content - Content to search through
   * @returns Position of closing brace
   */
  private static findClosingBrace(content: string): number {
    let braceCount = 1;
    for (let j = 0; j < content.length; j++) {
      if (content[j] === "{") braceCount++;
      if (content[j] === "}") braceCount--;
      if (braceCount === 0) {
        return j;
      }
    }
    return content.length;
  }

  /**
   * Parse fields from entry content and populate the entry object
   * @param fieldsContent - Raw field content string
   * @param entry - Entry object to populate
   */
  private static parseFields(fieldsContent: string, entry: BibtexEntry): void {
    // Match field = {value}, field = "value", or field = value
    const fieldPattern =
      /(\w+)\s*=\s*\{([^}]*)\}|(\w+)\s*=\s*"([^"]*)"|(\w+)\s*=\s*([^,}\n]+)/g;
    
    let fieldMatch;
    while ((fieldMatch = fieldPattern.exec(fieldsContent)) !== null) {
      let key: string;
      let value: string;
      
      if (fieldMatch[1]) {
        // Braces format: field = {value}
        key = fieldMatch[1];
        value = fieldMatch[2];
      } else if (fieldMatch[3]) {
        // Quotes format: field = "value"
        key = fieldMatch[3];
        value = fieldMatch[4];
      } else {
        // No braces/quotes: field = value
        key = fieldMatch[5];
        value = fieldMatch[6];
      }
      
      if (key && value !== undefined) {
        entry[key.toLowerCase()] = value.trim();
      }
    }
  }

  /**
   * Format author names from BibTeX format to a more readable format
   * Returns an array of author objects with formatted names
   * @param authors - Raw author string from BibTeX
   * @param highlightAuthor - Optional author name to highlight (e.g., "Akhmetov")
   * @returns Array of author objects with {name, isHighlighted}
   */
  static formatAuthors(
    authors: string,
    highlightAuthor?: string,
  ): Array<{ name: string; isHighlighted: boolean }> {
    if (!authors) return [];
    
    // Split by " and " to get individual authors
    const authorList = authors.split(/\s+and\s+/i);
    
    // Format each author
    return authorList.map((author) => {
      author = author.trim();
      
      // Check if author is in "Last, First Middle" format
      if (author.includes(",")) {
        const parts = author.split(",").map((p) => p.trim());
        const lastName = parts[0];
        const firstNames = parts[1] || "";
        
        // If we have a highlight author and this matches, mark it
        const isHighlighted = highlightAuthor
          ? lastName.toLowerCase().includes(highlightAuthor.toLowerCase())
          : false;
        
        const formatted = `${firstNames} ${lastName}`;
        return { name: formatted, isHighlighted };
      }
      
      // If not in standard format, return as-is
      return { name: author, isHighlighted: false };
    });
  }

  /**
   * Sort entries by year in descending order (most recent first)
   * @param entries - Array of entries to sort
   * @returns Sorted array
   */
  static sortByYear(entries: BibtexEntry[]): BibtexEntry[] {
    return entries.sort((a, b) => {
      const yearA = parseInt(a.year || "0");
      const yearB = parseInt(b.year || "0");
      return yearB - yearA;
    });
  }

  /**
   * Parse BibTeX content string into an array of entries with formatted authors
   * @param content - The raw BibTeX file content
   * @param highlightAuthor - Optional author name to highlight
   * @returns Array of parsed BibTeX entries with formatted authors
   */
  static parseWithFormattedAuthors(
    content: string,
    highlightAuthor?: string,
  ): BibtexEntry[] {
    const entries = this.parse(content);
    
    // Format authors for each entry
    entries.forEach((entry) => {
      if (entry.author) {
        entry.formattedAuthors = this.formatAuthors(entry.author, highlightAuthor);
      }
    });
    
    return entries;
  }

  /**
   * Parse, format authors, and sort BibTeX content in one call
   * @param content - Raw BibTeX file content
   * @param highlightAuthor - Optional author name to highlight
   * @returns Sorted array of parsed entries with formatted authors
   */
  static parseAndSortWithFormattedAuthors(
    content: string,
    highlightAuthor?: string,
  ): BibtexEntry[] {
    const entries = this.parseWithFormattedAuthors(content, highlightAuthor);
    return this.sortByYear(entries);
  }
}
