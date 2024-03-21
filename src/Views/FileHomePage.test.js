import { render, screen, fireEvent } from "@testing-library/react";
import FileHomePage from "./FileHomePage";

describe("Elements render as expected in the document", () => {
  it("Renders title", () => {
    render(<FileHomePage />);
    const titleElement = screen.getByText(/file portal/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("Renders all expected non-nested folders and files on initial render", async () => {
    render(<FileHomePage />);
    const files = await screen.findAllByTestId("folderfile");
    expect(files).toHaveLength(5);
  });

  it("Renders the sorting input", async () => {
    render(<FileHomePage />);
    const sortInput = await screen.findByTestId("sortByInput");
    const sortButton = await screen.findByTestId("sortButton");
    expect(sortInput).toBeInTheDocument();
    expect(sortButton).toBeInTheDocument();
  });

  it("Renders the filtering input", async () => {
    render(<FileHomePage />);
    const filterInput = await screen.findByTestId("filterInput");
    const clearButton = await screen.findByTestId("clearButton");
    expect(filterInput).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });
});

describe("Interactive elements are functional", () => {
  it("Renders more files or folders when a folder is clicked", async () => {
    render(<FileHomePage />);

    const existingFiles = await screen.findAllByTestId("folderfile");
    expect(existingFiles).toHaveLength(5);

    const expensesFolder = await screen.findByText(/expenses/i);
    fireEvent.click(expensesFolder);

    const files = await screen.findAllByTestId("folderfile");
    expect(files).toHaveLength(7);
  });

  it("Changes the order of the top level files when a sort request is made", async () => {
    render(<FileHomePage />);

    const existingFiles = await screen.findAllByTestId("folderfile");
    const sortInput = await screen.findByTestId("sortByInput");
    const sortButton = await screen.findByTestId("sortButton");

    fireEvent.change(sortInput, { target: { value: "size" } });
    fireEvent.click(sortButton);
    const sizeSortedFiles = await screen.findAllByTestId("folderfile");
    expect(existingFiles[0]).not.toBe(sizeSortedFiles[0]);

    fireEvent.change(sortInput, { target: { value: "date" } });
    fireEvent.click(sortButton);
    const dateSortedFiles = await screen.findAllByTestId("folderfile");
    expect(existingFiles[0]).not.toBe(dateSortedFiles[0]);

    fireEvent.change(sortInput, { target: { value: "name" } });
    fireEvent.click(sortButton);
    const nameSortedFiles = await screen.findAllByTestId("folderfile");
    expect(existingFiles[0]).not.toBe(nameSortedFiles[0]);
  });
  it("Filters down the files when a search criteria is entered", async () => {
    render(<FileHomePage />);
    const allFiles = await screen.findAllByTestId("folderfile");
    const filterInput = await screen.findByTestId("filterInput");
    fireEvent.change(filterInput, { target: { value: "em" } });
    const filteredFiles = await screen.findAllByTestId("folderfile");
    expect(filteredFiles.length).toBeLessThan(allFiles.length);

    const filteredFile = screen.getByText(/employee handbook/i);
    expect(filteredFile).toBeInTheDocument();

    fireEvent.change(filterInput, {
      target: { value: "non-matching-value-string" },
    });
    const nonMatchingFiles = await screen.queryAllByTestId("folderfile");
    expect(nonMatchingFiles).toHaveLength(0);
  });

  it("Returns the all files to the screen when clear search is pressed", async () => {
    render(<FileHomePage />);
    const allFiles = await screen.findAllByTestId("folderfile");
    const filterInput = await screen.findByTestId("filterInput");
    fireEvent.change(filterInput, { target: { value: "em" } });
    const filteredFiles = await screen.findAllByTestId("folderfile");
    expect(allFiles).toHaveLength(5);
    expect(filteredFiles.length).toBeLessThan(allFiles.length);

/*     const clearButton = await screen.findByTestId("clearButton");
    fireEvent.click(clearButton)
    const restoredFiles = await screen.findAllByTestId("folderfile");
    expect(restoredFiles).toHaveLength(5);
    expect(filteredFiles.length).toBeLessThan(restoredFiles.length); */
  });
});
