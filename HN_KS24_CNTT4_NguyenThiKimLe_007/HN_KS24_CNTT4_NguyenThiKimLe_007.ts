class Customer{
    static autoId = 1;
    id:number;
    name:string;
    email:string;
    phone:string;
    constructor(name:string,email:string,phone:string){
        this.id = Customer.autoId++;
        this.name = name;
        this.email =email;
        this.phone = phone
    }
    getDetails(){
        return `KH: ${this.id} | ${this.name} | ${this.email} | ${this.phone}`
    }
}
abstract class Vehicle{
    static autoId = 1;
    id:number;
    type:string;
    rentalPricePerDay:number;
    isAvailable:boolean;
    constructor(type:string, rentalPricePerDay:number, isAvailable:boolean){
        this.id = Vehicle.autoId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = isAvailable;
    }
    rent():void{
        if(this.isAvailable == true){
            this.isAvailable = false;
        }else{
            console.log(`Phương tiện đã được người khác thuê`)
        }
    }
    returnVehicle(){
        if(this.isAvailable == false){
            this.isAvailable = true;
            console.log(`Phương tiện đã được trả lại`);
            
        }else{
            console.log(`Phương tiện đã trả lại từ trước`)
        }
    }
    calculateRentalCost(day:number):number{
        if(day <=0){
            console.log(`Số ngày thuê không được nhỏ hơn 0`);
            return -1;
        }
        return this.rentalPricePerDay * day;
    }
    abstract getFeatures():string[];
    abstract getInsurancePolicy():string;
}
class Car extends Vehicle{
    feature:string[] ;
    insurancePolicy:string;
    constructor(type:string, rentalPricePerDay:number, isAvailable:boolean,feature:string[], insurancePolicy:string){
        super(type,rentalPricePerDay, isAvailable);
        this.feature= feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return `${this.feature}`;
    }
    getInsurancePolicy(): string {
        return `${this.insurancePolicy}`;
    }
}
class Motorcycle extends Vehicle{
    feature:string[] ;
    insurancePolicy:string;
    constructor(type:string, rentalPricePerDay:number, isAvailable:boolean,feature:string[], insurancePolicy:string){
        super(type,rentalPricePerDay, isAvailable);
        this.feature= feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return `${this.feature}`;
    }
    getInsurancePolicy(): string {
        return `${this.insurancePolicy}`;
    }
}
class Truck extends Vehicle{
    feature:string[] ;
    insurancePolicy:string;
    constructor(type:string, rentalPricePerDay:number, isAvailable:boolean,feature:string[], insurancePolicy:string){
        super(type,rentalPricePerDay, isAvailable);
        this.feature= feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return `${this.feature}`;
    }
    getInsurancePolicy(): string {
        return `${this.insurancePolicy}`;
    }
}
class Rental{
    static autoId = 1;
    rentalId: number;
    customer:Customer;
    vehicle:Vehicle;
    days:number;
    totalCost: number;
    constructor(customer:Customer, vehicle:Vehicle, day: number, totalCost:number){
        this.rentalId = Rental.autoId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = day;
        this.totalCost = totalCost;
    }
    getDetails(){
        return `Rental: ${this.rentalId} | ${this.customer} | ${this.vehicle} | ${this.days} | ${this.totalCost}`;
    }
}
class RentalAgency{
    vehicles:Vehicle[] = [];
    customers: Customer[] = [];
    rentals: Rental[] = [];
    addVehicle(vehicle:Vehicle):void{
        this.vehicles.push(vehicle);
    }
    addCustomer(name:string,email:string, phone:string):void{
        this.customers.push(new Customer(name,email,phone));
    }
    rentVehicle(customerId:number, vehicleId:number, days:number):Rental | null{

    }
    returnVehicle(vehicleId:number):void{
    
    }
    listAvailableVehicle():void{
        let vehicle = this.vehicles.filter(o => o.isAvailable == true);
        if(!vehicle){
            console.log(`Không tìm thấy xe sẵn sàng cho thuê`);
            return;
        }
        vehicle.forEach(o => console.log(o));
    }
    listCustomerRentals(customerId:number):void{
        let customer = this.customers.find(c => c.id = customerId);
        if(!customer){
            console.log(`Không tìm thấy khách hàng`);
            return;
        }
        this.rentals.filter(o => o.customer.name === customer.name).forEach(o =>console.log(o.getDetails()));
    }
    calculateTotalRevenue():number{
        return this.rentals.reduce((sum,o) => sum + o.totalCost,0);
    }
    getVehicleTypeCount():void{

    }
    getVehicleFeatures(vehicleId:number):void{
        let vehicle = this.vehicles.find(o => o.id === vehicleId);
        if(!vehicle){
            console.log(`Không tìm thấy xe`);
            return;
        }
        console.log(vehicle.getFeatures());
        
    }
    getVehicleInsurance(vehicleId:number):void{

    }
}
let choice;
let retal = new RentalAgency();
retal.addCustomer("Nguyễn Thị Kim Lệ", "nguyenle@gmail.com", "6273913712")
retal.addCustomer("Nguyễn Kim Kim","kimkim@gmail.com", "9283467832");
retal.addVehicle(new Car ("BWM", 67000, true, ["Điều hòa", "GPS dẫn đường"], "Bảo hiểm toàn diện"));
retal.addVehicle(new Motorcycle("Honda", 30000, true, ["Phân phối cao", "đường dài"], "Bảo hiểm 12 tháng"));
retal.addVehicle(new Truck("SH", 80000, true, ["Thùng hàng lớn", "Bửng nâng thủy lực"], "Bảo hiểm hàng hóa và phương tiện thương mại"))
do{
    choice = +prompt(`1. Thêm khách hàng mới
        2. Thêm phương tiện mới (cho chọn loại: Car, Motorcycle, Truck)
        3. Thuê xe (chọn khách hàng, chọn xe, nhập số ngày)
        4. Trả xe.
        5. Hiển thị danh sách xe còn trống (sử dụng filter)
        6. Hiển thị danh sách hợp đồng của một khách hàng (sử dụng filter)
        7. Tính và hiển thị tổng doanh thu (sử dụng reduce)
        8. Đếm số lượng từng loại xe (sử dụng reduce hoặc map)
        9. Tìm kiếm và hiển thị thông tin bằng mã định danh 
        10. Hiển thị tính năng và chính sách bảo hiểm của một xe (sử dụng find)
        11. Thoát chương trình.
        Mời bạn nhập lựa chọn:
        `)!;
    switch (choice) {
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            
            break;
        case 6:
            
            break;
        case 7:
            
            break;
        case 8:
            
            break;
        case 9:
            
            break;
        case 10:
            
            break;
        case 11:
            
            break;
        default:
            break;
    }
    
}while(choice!= 11);