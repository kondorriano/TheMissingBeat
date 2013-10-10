#pragma strict

class CreateColliders extends EditorWindow {
	@MenuItem("GGJ/CreateColliders")
	static function Init () {
		var window = ScriptableObject.CreateInstance.<CreateColliders>();
		window.Show();
	}
	
	function OnGUI () {
		if (GUILayout.Button("Create mesh colliders")) CreateMeshColliders();
	}
	
	function CreateMeshColliders() {
		var sel : Object[] = Selection.GetFiltered(GameObject, SelectionMode.Editable);
		for (var element : GameObject in sel) {
			if (!element.collider) element.AddComponent(MeshCollider);
		}
	}
}