function ApplyNum() {
  let playerNext = "X"
  const boxs = document.querySelectorAll('.box-game')
  const btntrg = document.querySelectorAll('button[btn-trigger]')
  const btnBox = document.querySelector('.information-box')
  const titleAlert = document.querySelector('.information-box h3')
  const keyboardKep = "789456123".split("")
  const changePlayer = (input) => {
    const option = input? input : playerNext === "X" ? "O" : "X"
    document.querySelector('[player-display="content"]').innerText = document.querySelector(`[player-name="${option.toLowerCase()}"]`).innerText
    playerNext = option
  }
  changePlayer(playerNext)
  btntrg.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const trigger = btn.getAttribute('btn-trigger')
      if(trigger == "reload") {
        document.querySelectorAll(`b[player]`).forEach((player, i) => {
          player.innerText = "0"
        })
      }
      boxs.forEach((box, i) => {
        box.innerText = ""
      })
      if(document.querySelector('.flex-box').getAttribute("finis")) {
        document.querySelector('.flex-box').removeAttribute("finis")
      }
      btnBox.style.display = "none"
    })
  })
  boxs.forEach((box, i) => {
    box.setAttribute("poin", i.toString())
    box.addEventListener('click', () => {
      ApplyGame(box)
    })
  })
  document.addEventListener('keyup', (event) => {
    const keyup = event.key.toLowerCase()
    if(keyup == "-" || keyup == "enter") {
      if(!document.querySelector('.flex-box').getAttribute("finis")) {
        return;
      }
      if(keyup == "-") {
        document.querySelectorAll(`b[player]`).forEach((player, i) => {
          player.innerText = "0"
        })
      }
      boxs.forEach((box, i) => {
        box.innerText = ""
      })
      if(document.querySelector('.flex-box').getAttribute("finis")) {
        document.querySelector('.flex-box').removeAttribute("finis")
      }
      btnBox.style.display = "none"
      return;
    }
    for(let a in keyboardKep) {
      if(keyboardKep[a] == keyup) {
        console.log("Trigger:", a, boxs[a])
        ApplyGame(boxs[a])
      }
    }
  })
  function ApplyGame(box) {
    if(!!box.innerHTML || !!document.querySelector('.flex-box').getAttribute("finis")) return; // tidak dapat mengisi lagi
      box.innerHTML = playerNext 
      let dataTictactoe = []
      boxs.forEach((data) => {
        dataTictactoe.push(!!data.innerHTML? data.innerHTML : null)
      })
    const isWinner = CalculateWinner(dataTictactoe)
    if(isWinner) {
      const playerDash = document.querySelector(`[player="${isWinner.toLowerCase()}"]`)
      const playerName = document.querySelector(`[player-name="${isWinner.toLowerCase()}"]`).innerText
      titleAlert.innerText = `"${playerName}" memenangkan 1 score`
      playerDash.innerText = Number(playerDash.innerText) + 1
      document.querySelector('.flex-box').setAttribute("finis", "!")
      btnBox.style.display = "flex"
      changePlayer(isWinner.toUpperCase())
      return; // jangan lanjutkan
    }
    if(dataTictactoe.filter(a => typeof a != "string").length < 1) {
      // Jika data penuh tetapi tdk ada yg menang, maka tidak ada score
      btnBox.style.display = "flex"
      titleAlert.innerText = "Yep, tidak ada yang memang"
      return;
    }
    changePlayer()
  }
}
function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
ApplyNum()