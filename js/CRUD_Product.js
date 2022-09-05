// Bật modal
function openModal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/categories",
        success: function (data) {
            let content = ""
            content += ' <option >' + "---" +
                '</option>'
            for (let i = 0; i < data.length; i++) {
                content += ' <option value="' + data[i].id + '">' + data[i].name +
                    '</option>'
            }
            document.getElementById("select-category").innerHTML = content;
        }
    })
    $('#exampleModal').modal('show');
}

function closeModal() {
    document.getElementById('nameProduct').innerHTML = "";
    document.getElementById('price').innerHTML = "";
    document.getElementById('amount').innerHTML = "";
    document.getElementById('color').innerHTML = "";
    document.getElementById('description').innerHTML = "";
    document.getElementById('discount').innerHTML = "";
    document.getElementById('select-category').innerHTML = "";
    document.getElementById('select-brand').innerHTML = "";
    document.getElementById('photo').innerHTML = "";
    $('#exampleModal').modal('hide');
}

// Hiển thị sản phẩm
getProducts()

function getProducts() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/products",
        success: function (data) {
            loadTable(data)
        }
    })
}


function loadTable(list) {
    let content = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].product.status !== 0){
            content += "<tr>"
            content += "<th>" + (i + 1) + "</th>"
            content += "<th>" + list[i].product.name + "</th>"
            content += "<th>" + list[i].product.price + "</th>"
            content += "<th>" + list[i].product.amount + "</th>"
            content += "<th>" + list[i].product.color + "</th>"
            content += "<th>" + list[i].product.description + "</th>"
            content += " <th>" + '<img  src="  ' + list[i].imageURLS[0] + '  "  width="100" height="100" alt="Error">' + "</th>"

            content += "      <th>\n" +
                "                            <button onclick='getProduct(" + list[i].product.id + ")' class=\"tm-product-delete-link\">\n" +
                "                                <i class=\"far fa-edit tm-product-delete-icon\"></i>\n" +
                "                            </button>\n" +
                "                        </th>"
            content += "   <th>\n" +
                "                            <button onclick='deleteProduct(" + list[i].product.id + ")' href=\"#\" class=\"tm-product-delete-link\">\n" +
                "                                <i class=\"far fa-trash-alt tm-product-delete-icon\"></i>\n" +
                "                            </button>\n" +
                "                        </th>"
            content += "</tr>"
        }
    }
    document.getElementById("display-product").innerHTML = content;
}


// Tìm Sản phẩm theo Id



// Lấy link hình ảnh theo ID của Product
function getImageURL(id) {
    let list = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/products/image/" + id,
        success: function (data) {
            console.log(data)
            list = data
        }
    })
    return list
}


// Lấy Brand theo Category
function checkCategory() {
    let id = document.getElementById("select-category").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/brands/" + id,
        success: function (data) {
            let content = ""
            for (let i = 0; i < data.length; i++) {
                content += ' <option value="' + data[i].id + '">' + data[i].name +
                    '</option>'
            }
            document.getElementById("select-brand").innerHTML = content;
        }
    })

}


let idMax = 0;


function saveImageURL() {
    getNewProduct()
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').files[0];
    const file1 = document.querySelector('#photo').files[1];
    const file2 = document.querySelector('#photo').files[2];
    const metadata = {
        contentType: file.type
    }
    const nameImg = file.name;
    const name1 = file1.name;
    const name2 = file2.name;

    const uploadIMG = ref.child(nameImg).put(file, metadata);
    uploadIMG
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            document.getElementById('loadImg').innerHTML = " <th>" + '<img  src="  ' + url + '  "  width="100" height="100" alt="Error">' + "</th>"
            let imageURL = {
                name: url,
                product: {
                    id: idMax
                }
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(imageURL),
                //tên API
                url: "http://localhost:8081/api/products/imageURL",
                //xử lý khi thành công
                success: function () {

                }
            });
            //chặn sự kiện mặc định của thẻ
            event.preventDefault();
        })

    const uploadIMG1 = ref.child(name1).put(file1, metadata);
    uploadIMG1
        .then(snapshot1 => snapshot1.ref.getDownloadURL())
        .then(url1 => {
            document.getElementById('loadImg1').innerHTML = " <th>" + '<img  src="  ' + url1 + '  "  width="100" height="100" alt="Error">' + "</th>"
            let imageURL = {
                name: url1,
                product: {
                    id: idMax
                }
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(imageURL),
                //tên API
                url: "http://localhost:8081/api/products/imageURL",
                //xử lý khi thành công
                success: function () {

                }
            });
            //chặn sự kiện mặc định của thẻ
            event.preventDefault();
        })

    const uploadIMG2 = ref.child(name2).put(file2, metadata);
    uploadIMG2
        .then(snapshot2 => snapshot2.ref.getDownloadURL())
        .then(url2 => {
            document.getElementById('loadImg2').innerHTML = " <th>" + '<img  src="  ' + url2 + '  "  width="100" height="100" alt="Error">' + "</th>"
            let imageURL = {
                name: url2,
                product: {
                    id: idMax
                }
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(imageURL),
                //tên API
                url: "http://localhost:8081/api/products/imageURL",
                //xử lý khi thành công
                success: function () {
                }
            });
            //chặn sự kiện mặc định của thẻ
            event.preventDefault();
        })

}

function createProduct() {
    //Tạo đối tượng không có chứa ảnh
    let name = $('#nameProduct').val()
    let price = $('#price').val()
    let amount = $('#amount').val()
    let color = $('#color').val()
    let description = $('#description').val()
    let discount = $('#discount').val()
    let category_id = $('#select-category').val()
    let brand_id = $('#select-brand').val()
    let status = 1;
    let Product = {
        name: name,
        price: price,
        amount: amount,
        color: color,
        description: description,
        status: status,
        discount: discount,
        brand: {
            id: brand_id
        },
        category: {
            id: category_id
        }

    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(Product),
        //tên API
        url: "http://localhost:8081/api/products",
        //xử lý khi thành công
        success: function () {
            saveImageURL()
            setTimeout(createDone, 8000)
            setTimeout(closeModal, 8000)
            getProducts()
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}


function getNewProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/products/new-product",
        success: function (id) {
            idMax = id;
        }
    })
}

function createDone() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tạo mới thành công',
        showConfirmButton: false,
        timer: 1500
    })
}

function deleteProduct(id) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa ?',
        text: "Bạn không thể khôi phục dữ liệu sau khi xóa  !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Xóa!',
                'Sản phẩm đã được xóa khỏi cửa hàng.',
                'success',
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8081/api/products/" + id,
                    success: function () {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                       getProducts()
                    }

                })
            )
        }
    })

}

let idProduct = 0;

function getProduct(idProduct) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/products/" + idProduct,
        success: function (data) {
            openModal()
            idProduct = data.id;
            document.getElementById("nameProduct").value = data.name;
            document.getElementById('price').value = data.price;
            document.getElementById('amount').value = data.amount;
            document.getElementById('color').value = data.color;
            document.getElementById('description').innerHTML = data.description;
            document.getElementById('discount').value = data.discount;
            document.getElementById("title-button").setAttribute("onclick","updateProduct()");
        }
    })
}



function updateProduct() {
    let name = $('#nameProduct').val()
    let price = $('#price').val()
    let amount = $('#amount').val()
    let color = $('#color').val()
    let description = $('#description').val()
    let discount = $('#discount').val()
    let category_id = $('#select-category').val()
    let brand_id = $('#select-brand').val()
    let status = 1;
    let Product = {
        id: idProduct,
        name: name,
        price: price,
        amount: amount,
        color: color,
        description: description,
        status: status,
        discount: discount,
        brand: {
            id: brand_id
        },
        category: {
            id: category_id
        }

    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(Product),
        //tên API
        url: "http://localhost:8081/api/products",
        //xử lý khi thành công
        success: function () {
            saveImageURL()
            setTimeout(createDone, 8000)
            setTimeout(closeModal, 8000)
            getProducts()
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}





