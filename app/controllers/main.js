var sanPhamServices = new SanPhamServices();

function getEle(id) {
    return document.getElementById(id);
}

var themSanPham = function() {
    
    /**
     * Lấy thông tin từ form
     * 
     */


    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;


    /**
     * Khởi tạo đối tượng sp từ lớp đối tượng SanPham
     */

    var sp = new SanPham (tenSP, gia, hinhAnh, moTa );

    // Call api lưu data xuống data base

    sanPhamServices.themSP(sp) 
        .then(function(result ) {
            console.log(result);
            layDanhSachSanPham();

        }).catch(function(err) {
            console.log(err);
        })

}





getEle('btnThemSP').addEventListener('click', function() {
    getEle('formSP').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `
        <button class="btn btn-success" onclick="themSanPham()">Thêm sản phẩm</button>
    `
});

var xoaSanPham = function(id) {
    sanPhamServices.xoaSP(id) 
        .then(function(result) {
            // Load lại danh sách sản phẩm sau khi xóa thành công
            alert('Success');
            layDanhSachSanPham();
        }).catch(function(err) {
            console.log(err);
        })
    
}

var capNhatSanPham = function(id) {
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;

    var sp = new SanPham(tenSP, gia, hinhAnh, moTa );
    
    sanPhamServices.capNhatSP(id, sp) 
        .then(function(result){
            console.log(result.data);
            layDanhSachSanPham();
            // Ẩn model khi cập nhật thành công
            document.querySelector('#myModal .close').click();
            
            
        })
        .catch(function(err) {
            console.log(err);
        })
    
}

var xemSanPham = function(id) {
    sanPhamServices.xemSP(id) 
        .then(function(result) {
            var sp = result.data;
            getEle('btnThemSP').click();
            // $('#myModal').modal('show');
            getEle('TenSP').value = sp.tenSP;
            getEle('GiaSP').value = sp.gia;
            getEle('HinhSP').value = sp.hinhAnh;
            getEle('moTa').value = sp.moTa;
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML = `
                <button class="btn btn-success" onclick="capNhatSanPham('${sp.id}')">Cập nhật</button>
            `
        })
        .catch(function(err) {
            console.log(err);
        })
}



function renderTable(mangSP) {
    var content = '';
    mangSP.map(function (sp , index) {
        content += 
            `
                <tr>
                <td>${index + 1}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>
                    <img style="width: 80px; height: 80px" src="${sp.hinhAnh}">
                </td>
                <td>${sp.moTa}</td>
                <td>
                    <button class="btn btn-success " onclick="xemSanPham('${sp.id}')">Xem</button>
                    <button class="btn btn-danger" onclick="xoaSanPham('${sp.id}')">Xóa</button>
                </td>
                </tr>
            `
    });
    getEle('tblDanhSachSP').innerHTML = content;
    
}

getEle('ipTimKiem').addEventListener('keyup', function() {
    var mangSP = getLocalStorage();
    var chuoiTimKiem = getEle('ipTimKiem').value;
    var mangTimKiem = sanPhamServices.timKiemSP(mangSP,chuoiTimKiem);
    renderTable(mangTimKiem);
})

var layDanhSachSanPham = function() {
    sanPhamServices.layDanhSachSanPham().then(function(results) {
        // Resolve
        // console.log(results.data);
        // render table
        renderTable(results.data);
        setLocalStorage(results.data);
    }).catch(function(error) {
        console.log(error);
    })
}

layDanhSachSanPham()


function setLocalStorage(dssp) {
    localStorage.setItem('DSSP', JSON.stringify(dssp));
}

function getLocalStorage() {
    if (localStorage.getItem('DSSP')){
     return JSON.parse(localStorage.getItem('DSSP'));
    }
}

getLocalStorage();