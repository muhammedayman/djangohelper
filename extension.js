const vscode = require("vscode");

function parseModelString(str, type_command) {
  let block = "";
  if (type_command == "secu") {
    block =
      "class " +
      str +
      "Serilizers(serializers.ModelSerializer):\n\tclass Meta:\n\t\tmodel=" +
      str +
      "\n\t\texclude=('created_at','updated_at')";
  }
  if (type_command == "sall") {
    block =
      "class " +
      str +
      "Serilizers(serializers.ModelSerializer):\n\tclass Meta:\n\t\tmodel=" +
      str +
      "\n\t\tfields='__all__'";
  }
  if (type_command == "sf") {
    block =
      "class " +
      str +
      "Serilizers(serializers.ModelSerializer):\n\tclass Meta:\n\t\tmodel=" +
      str +
      "\n\t\tfields=('')";
  }
  if (type_command == "vs") {
    block =
      "class " +
      str +
      "Viewset(viewsets.ModelViewSet):\n\tqueryset = " +
      str +
      ".objects.all()\n\tserializer_class = " +
      str +
      "Serializer";
  }
  if (type_command == "rs") {
    block =
      "from rest_framework import routers\nfrom django.urls import path\nfrom .views import " +
      str +
      "Viewset\nrouter = routers.SimpleRouter()\nrouter.register(r'" +
      str.toLowerCase() +
      "', " +
      str +
      "Viewset, basename='" +
      str.toLowerCase() +
      "')\nurlpatterns = router.urls\n";
  }
  if (type_command == "rr") {
    block =
      "router = routers.SimpleRouter()\nrouter.register(r'" +
      str.toLowerCase() +
      "', " +
      str +
      "Viewset, basename='" +
      str.toLowerCase() +
      "')";
  }
  return block;
}

function getCommands() {

  let clipboard;
  return {
    copy: function () {
      const editor = vscode.window.activeTextEditor;
      const selection = editor.selection;
      clipboard = editor.document.getText(selection);
      console.log(clipboard)
    },
    pastesf: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "sf");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
    pastecu: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "secu");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
    pastall: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "sall");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
    pastevs: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "vs");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
    pasters: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "rs");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
    pasterr: function () {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const arr = parseModelString(clipboard, "rr");

      if (arr != null) {
        editor.edit((edit) => {
          edit.insert(pos, `${arr}`);
        });
      } else {
        vscode.window.showInformationMessage("No code to paste");
      }
    },
  };
}

function activate(context) {
  const { copy, pastesf, pastecu, pastall, pastevs, pasters,pasterr } = getCommands();

  const copyModelName = vscode.commands.registerCommand(
    "djangohelperext.copyModelName",
    copy
  );

  const pasteModelSerializer = vscode.commands.registerCommand(
    "djangohelperext.pasteModelSerializer",
    pastesf
  );
  const pasteModelSerializerECU = vscode.commands.registerCommand(
    "djangohelperext.pasteModelSerializerECU",
    pastecu
  );
  const pasteModelSerializerAll = vscode.commands.registerCommand(
    "djangohelperext.pasteModelSerializerAll",
    pastall
  );
  const pasteModelViewset = vscode.commands.registerCommand(
    "djangohelperext.pasteModelViewset",
    pastevs
  );
  const pasteModelSimpleRouter = vscode.commands.registerCommand(
    "djangohelperext.pasteModelSimpleRouter",
    pasters
  );
  const pasteModelSimpleRouterReg = vscode.commands.registerCommand(
    "djangohelperext.pasteModelSimpleRouterReg",
    pasterr
  );

  context.subscriptions.push(copyModelName);
  context.subscriptions.push(pasteModelSerializer);
  context.subscriptions.push(pasteModelSerializerECU);
  context.subscriptions.push(pasteModelSerializerAll);
  context.subscriptions.push(pasteModelViewset);
  context.subscriptions.push(pasteModelSimpleRouter);
  context.subscriptions.push(pasteModelSimpleRouterReg);
}
exports.activate = activate;
exports.parseModelString = parseModelString;