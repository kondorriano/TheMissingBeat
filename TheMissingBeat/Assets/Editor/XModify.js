class XModify extends EditorWindow {
	private var s : String = "0";
	
	//anade opcion al menu
	@MenuItem("GGJ/XModify")
	static function Init() {
		var window : XModify = EditorWindow.GetWindow(XModify);
		window.Show();
	}
	function OnGUI() {
		s = GUI.TextField(Rect(0,20,95,20), s, 25);
		if (s) {
			var val : int = parseInt(s);
			if(GUILayout.Button("Add X")) addToX(val);
		}
	}
	function addToX(x : int) {
		var sel : Object[] = Selection.GetFiltered(GameObject, SelectionMode.Editable);
		for(var element : GameObject in sel) element.transform.position.x += x;
	}
}