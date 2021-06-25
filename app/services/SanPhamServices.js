function SanPhamServices () {
    this.layDanhSachSanPham = function () {
        // GET: Lấy dữ liệu từ server
        return axios({
            url:'https://60d5dbf9943aa60017768c5a.mockapi.io/products',
            method: 'GET',
        });        
    }
}