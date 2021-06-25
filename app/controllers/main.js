var sanPhamServices = new SanPhamServices();

function getELe(id) {
    return document.getElementById(id);
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
                    <button class="btn btn-success">Xem</button>
                    <button class="btn btn-danger">Xóa</button>
                </td>
                </tr>
            `
    });
    getELe('tblDanhSachSP').innerHTML = content;
    
}




var layDanhSachSanPham = function() {
    sanPhamServices.layDanhSachSanPham().then(function(results) {
        // Resolve
        // console.log(results.data);
        // render table
        renderTable(results.data);
    }).catch(function(error) {
        console.log(error);
    })
}

layDanhSachSanPham()