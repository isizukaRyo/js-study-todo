const addtask = document.querySelector('.add');
const list = document.querySelector('.todo');
//フィルタリング機能
const search = document.querySelector('.search input');


const saveTaskToLocalStorage = (task, html) => {
	// null は、localStorage に保存しない
	if (html) {
		// localStorage は、0 から始まる
		//		setItemでデータを追加
		localStorage.setItem(task, html);
		return;
	}
	return;
}

const deleteTaskFromLocalStorage = task => {
	//removeItemで保存されたデータを削除
	localStorage.removeItem(task);
	return;
}
//taskの追加機能

//htmlに追加
const creatList = task => {

	const html = `
    <li class="todo-list">
        <span>${task}</span>
       <i class="far fa-trash-alt delete"></i>
    </li>
    `;
	list.innerHTML += html;

	saveTaskToLocalStorage(task, html);
}

addtask.addEventListener('submit', e => {
	// デフォルトのイベントを無効
	e.preventDefault();

	//	trim()を使って空白をなくす
	const task = addtask.add.value.trim();

	if (task.length) {
		//		htmlを作成
		creatList(task);
		//入力した文字をリセット
		addtask.reset();

	}
});

//削除機能を追加
//evnt.target イベント発生源である要素を取得します。
// class 属性のリストを返す
//contains 指定したクラスがclass要素に含まれるかどうかを判定。
//parentElement親要素を取得
list.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
		const task = e.target.parentElement.textContent.trim()
		deleteTaskFromLocalStorage(task);
	}
});


const filtertasks = (term) => {
	//childrenで子要素を取得

	Array.from(list.children)
		// フィルタ条件
		.filter((todo) => !todo.textContent.toLowerCase().includes(term))
		.forEach((todo) => todo.classList.add('filtered'));

	Array.from(list.children)
		//toLowerCaseは呼び出し元の文字列値を、小文字に変換して返す。
		//includes 1 つの文字列を別の文字列の中に見出すことができるかどうかを判断し、必要に応じて true か false を返す
		.filter((todo) =>
			todo.textContent.toLowerCase().includes(term))
		.forEach((todo) => todo.classList.remove('filtered'));
};
search.addEventListener('keyup', () => {
	// 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
	const term = search.value.trim().toLowerCase();
	filtertasks(term);
});


//タスクを保存できる様にする
(function () {
	// 初期化処理
	// ローカルストレージに格納されている値を取得し、リストを生成する
	for (var key in localStorage) {
		var html = localStorage.getItem(key);
		if (html) {
			list.innerHTML += localStorage.getItem(key);
		}
	}
})();
