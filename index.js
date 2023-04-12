import { menuArray } from "./data.js"
let shoppingPriceArray = []
let shoppingListArray = []
let sumPrice = 0

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {handleAddClick(parseInt(e.target.dataset.add))}
    if (e.target.dataset.remove) {handleRemoveClick(parseInt(e.target.dataset.remove))}
    if (e.target.id === "completeOrder") {handleCompleteClick()}
    if (e.target.id === "pay") {handlePayClick(e)}
    if (e.target.id === "cancel") {handleCancelClick(e)}
})

function handleAddClick(itemId) {
    const targetItem = menuArray.filter(function(item) {
            return item.id === itemId})[0]
            shoppingListArray.push(targetItem)
            shoppingPriceArray.push(targetItem.price)
            handleSum()
            render()
            document.getElementById("hide").classList.remove("hidden")
}

function handleSum() {
    sumPrice = shoppingPriceArray.reduce((a, b) => {
        return a + b
    }, 0)
    render()
}

function handleRemoveClick(index) {
    shoppingListArray.splice(index, 1)
    shoppingPriceArray.splice(index, 1)
    handleSum()
    render()
    document.getElementById("hide").classList.remove("hidden")
}

function handleCompleteClick() {
    document.getElementById("modal-section").style.display = "block"
}

function handlePayClick(e) {
    e.preventDefault()
    if (form.checkValidity()) {
    document.getElementById("modal-section").style.display = "none"
    document.getElementById("order-section").innerHTML =`
    <div class="thanks-container">
        <p class="thanks-text">
        Thank you! Your order is on its way!
        </p>
    </div>
    `
    shoppingPriceArray = []
    shoppingListArray = []
    sumPrice = 0
    }
}

function handleCancelClick(e) {
    e.preventDefault()
    document.getElementById("modal-section").style.display = "none"
}

function getHtml() {
    let mainSectionHtml = ''
    let itemsContainer = ''
    let shoppingListHtml = ''
    let modalHtml = ''

    menuArray.forEach(function(item, name) {
        itemsContainer += `
            <div class="item">
                <div class="icon">
                    ${item.emoji}
                </div>
                <div class="item-text-container">
                    <div class="item-name">
                        ${item.name}
                    </div>
                    <div class="item-ingredients">
                        ${(item.ingredients).join(', ')}
                    </div>
                    <div class="item-price">
                        $ ${item.price}
                    </div>
                </div>
                <button class="add-btn" data-add="${name}"></button>
            </div>
            <div class="divider"></div>
        `
    })

    shoppingListArray.forEach(function(targetItem, name) {
        shoppingListHtml += `
        <div class="shopping-list">
            <div class="ordered-item">
                <div class="ordered-item-name">
                    ${targetItem.name}<span class="remove" id="remove" data-remove="${name}">remove</span>
                </div>
                <div class="ordered-item-price">
                    $ ${targetItem.price}
                </div>
            </div>
        </div>
        `
    })

    modalHtml = `
    <section id="modal-section">
        <h4 class="enter-card-details">
        Enter card details
        </h4>
        <form id="form">

            <input type="text"
                        id="inputText"
                        placeholder="Enter your name"
                        name="name"
                        required
                        />

            <input type="number" 
                        id="inputNumber"
                        placeholder="Enter card number"
                        name="number"
                        min="1000000000000000"
                        maxlength="16"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        onkeydown="return event.keyCode !== 69"
                        required
                        />

            <input type="number"
                        id="inputCvv"
                        placeholder="Enter CVV"
                        name="cvv"
                        min="100"
                        maxlength="3"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        onkeydown="return event.keyCode !== 69"
                        required
                        />

            <button type="submit" id="pay">Pay</button>
            <button type="cancel" id="cancel">Cancel</button>


        </form>
    </section>
    `

    mainSectionHtml = `
    ${modalHtml}

        <div class="item-container">
            ${itemsContainer}
        </div>
<div id="hide" class="hidden">
        <div id="order-section" class="order-section">
            <div class="your-order">
                Your order
            </div>
            <div class="ordered-items">
                ${shoppingListHtml}
            </div>
            <div class="sum-divider"></div>

            <div class="total-price">
                <div>Total price:</div>
                <div>$ ${sumPrice}</div>
            </div>
            <button id="completeOrder">Complete order</button>
        </div>
</div>
    `
    return mainSectionHtml;
}

function render() {
    document.getElementById('main-section').innerHTML = getHtml()
}

render()
