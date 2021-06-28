function SanPhamServices () {
    this.layDanhSachSanPham = function () {
        // GET: Lấy dữ liệu từ server
        return axios({
            url:'https://60d5dbf9943aa60017768c5a.mockapi.io/products',
            method: 'GET',
        });        
    };

    this.themSP = function (sp) {
        //POST Thêm mới dữ liệu
        // data : dữ liệu cần thêm vào data base 
        return axios({
            url:'https://60d5dbf9943aa60017768c5a.mockapi.io/products',
            method: 'POST',
            data: sp,
        });
    };

    this.xoaSP = function(id) {
        //Delete: xóa data thông qua id
        return axios({
            url:`https://60d5dbf9943aa60017768c5a.mockapi.io/products/${id}`,
            method: 'DELETE'
        })
    };

    this.xemSP = function (id) {
        // GET: lấy data của 1 sp theo id
        return axios({
            url:`https://60d5dbf9943aa60017768c5a.mockapi.io/products/${id}`,
            method: 'GET',
        })
    }

    this.capNhatSP = function (id, sp) {
        return axios({
            url:`https://60d5dbf9943aa60017768c5a.mockapi.io/products/${id}`,
            method: 'PUT',
            data: sp,
        })
    }

    this.timKiemSP = function (dssp, chuoiTimKiem) {
        return dssp.filter(function(sp) {
            return sp.tenSP.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1;
        })
    }   
}