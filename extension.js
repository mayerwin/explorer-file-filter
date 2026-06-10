const vscode = require("vscode");

/**
 * Explorer File Filter
 *
 * Contributes a single Explorer toolbar button (next to "Collapse Folders")
 * that focuses the file explorer and opens its built-in filter — the same
 * control you can reach from the keyboard, surfaced where it should have been
 * all along. The filter prunes the tree to matching files (Filter mode).
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Make the tree filter prune to matches (Filter mode) instead of only
  // highlighting them, so the button does what people expect. This sets the
  // built-in `workbench.list.defaultFindMode` once; change it back any time.
  // Skipped while developing the extension so it never alters real settings.
  if (context.extensionMode !== vscode.ExtensionMode.Development) {
    const cfg = vscode.workspace.getConfiguration("workbench.list");
    if (cfg.get("defaultFindMode") !== "filter") {
      cfg.update("defaultFindMode", "filter", vscode.ConfigurationTarget.Global);
    }
  }

  const command = vscode.commands.registerCommand(
    "explorerFileFilter.filter",
    async () => {
      // The find/filter widget acts on the focused tree, so focus the
      // file explorer first, then open the filter.
      await vscode.commands.executeCommand(
        "workbench.files.action.focusFilesExplorer"
      );
      await vscode.commands.executeCommand("list.find");
    }
  );
  context.subscriptions.push(command);
}

function deactivate() {}

module.exports = { activate, deactivate };
