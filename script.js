// variables
let sellingPrice = document.getElementById('sellingPrice')
let productName = document.getElementById('productName')
let button = document.getElementById('btn')
let productList = document.getElementsByClassName('productList')[0]
let totalAmount = document.getElementById('totalAmount')
let count = 0

// add product details
const addProductDetails = () => {
     // list item 
     let productDetail = document.createElement('li')
     productDetail.id = `productDetail${count++}`
     productDetail.textContent = `${sellingPrice.value} - ${productName.value}`
     // delete button
     let deleteBtn = document.createElement('button')
     deleteBtn.textContent = 'Delete'
     deleteBtn.id = 'deleteBtn'

     // delete button functionality
     const deleteFunction = (event) => {
          let productPrice = event.target.parentElement.textContent
          let price = productPrice.split(" ")[0]
          price = parseInt(price)
          totalAmount.textContent = `${parseInt(totalAmount.textContent) - price}`

          productDetail.remove()
          deleteBtn.remove()

          // DELETE request
          axios.delete(`https://crudcrud.com/api/58b6f37eb7d0406a95bf678ee6ccf57a/productDetails/${_id}`)
               .then((response) => {
                    console.log(response)
               }).catch((error) => {
                    console.log(error)
               })          
     }
     deleteBtn.addEventListener('click', deleteFunction)

     // show product details
     productList.append(productDetail)
     productDetail.appendChild(deleteBtn)

     // show total amount
     if (sellingPrice.value !== '') {
          totalAmount.textContent = `${parseInt(sellingPrice.value) + parseInt(totalAmount.textContent)}`
          // save to locaStorage
          localStorage.setItem(productName.value, productDetail.textContent)

          // POST request
          axios.post(`https://crudcrud.com/api/58b6f37eb7d0406a95bf678ee6ccf57a/productDetails`, {
               sellingPrice: document.getElementById('sellingPrice').value,
               productName: document.getElementById('productName').value
          }).then((response) => {
               console.log(response)
          }).catch((error) => {
               console.log(error)
          })
     }
     else {
          totalAmount.textContent = parseInt(totalAmount.textContent) + 0
     }

     // clear input fields
     sellingPrice.value = ""
     productName.value = ""
}

const retrieveProductDetails = () => {
     axios.get(`https://crudcrud.com/api/58b6f37eb7d0406a95bf678ee6ccf57a/productDetails`)
          .then((response) => {
               console.log(response)
               for (let i = 0; response.data.length; i++) {
                    const { sellingPrice, productName, _id } = response.data[i]
                    let productDetail = document.createElement('li')
                    productDetail.textContent = `${sellingPrice.value} - ${productName.value}`

                    let deleteBtn = document.createElement('button')
                    deleteBtn.textContent = 'Delete'

                    // delete button functionality
                    let deleteFunction = (event) => {
                         productDetail.remove()
                         deleteBtn.remove()

                         let productPrice = event.target.productDetail.textContent
                         let price = parseInt(productPrice.split(" - ")[0])
                         totalAmount.textContent = `${parseInt(totalAmount.textContent) - price}`

                         // DELETE request
                         axios.delete(`https://crudcrud.com/api/58b6f37eb7d0406a95bf678ee6ccf57a/productDetails/${_id}`)
                              .then((response) => {
                                   console.log(response)
                              }).catch((error) => {
                                   console.log(error)
                              })
                    }
                    deleteBtn.addEventListener('click', deleteFunction)
               }
          })
}

button.addEventListener('click', addProductDetails)
window.addEventListener('DOMContentLoaded', retrieveProductDetails)