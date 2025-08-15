class Customer {
    static autoId = 1;
    id: number;
    name: string;
    email: string;
    phone: string;
    constructor(name: string, email: string, phone: string) {
        this.id = Customer.autoId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `KH: ${this.id} | ${this.name} | ${this.email} | ${this.phone}`;
    }
}

abstract class Vehicle {
    static autoId = 1;
    id: number;
    type: string;
    rentalPricePerDay: number;
    isAvailable: boolean;
    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean) {
        this.id = Vehicle.autoId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = isAvailable;
    }
    rent(): void {
        if (this.isAvailable) {
            this.isAvailable = false;
        } else {
            console.log(`Phương tiện đã được người khác thuê`);
        }
    }
    returnVehicle() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            console.log(`Phương tiện đã được trả lại`);
        } else {
            console.log(`Phương tiện đã trả lại từ trước`);
        }
    }
    calculateRentalCost(day: number): number {
        if (day <= 0) {
            console.log(`Số ngày thuê không được nhỏ hơn 0`);
            return -1;
        }
        return this.rentalPricePerDay * day;
    }
    abstract getFeatures(): string[];
    abstract getInsurancePolicy(): string;
}

class Car extends Vehicle {
    feature: string[];
    insurancePolicy: string;
    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return this.feature;
    }
    getInsurancePolicy(): string {
        return this.insurancePolicy;
    }
}

class Motorcycle extends Vehicle {
    feature: string[];
    insurancePolicy: string;
    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return this.feature;
    }
    getInsurancePolicy(): string {
        return this.insurancePolicy;
    }
}

class Truck extends Vehicle {
    feature: string[];
    insurancePolicy: string;
    constructor(type: string, rentalPricePerDay: number, isAvailable: boolean, feature: string[], insurancePolicy: string) {
        super(type, rentalPricePerDay, isAvailable);
        this.feature = feature;
        this.insurancePolicy = insurancePolicy;
    }
    getFeatures(): string[] {
        return this.feature;
    }
    getInsurancePolicy(): string {
        return this.insurancePolicy;
    }
}

class Rental {
    static autoId = 1;
    rentalId: number;
    customer: Customer;
    vehicle: Vehicle;
    days: number;
    totalCost: number;
    constructor(customer: Customer, vehicle: Vehicle, days: number, totalCost: number) {
        this.rentalId = Rental.autoId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = totalCost;
    }
    getDetails() {
        return `Rental: ${this.rentalId} | ${this.customer.getDetails()} | Xe: ${this.vehicle.type} (ID: ${this.vehicle.id}) | Số ngày: ${this.days} | Tổng tiền: ${this.totalCost}`;
    }
}

class RentalAgency {
    vehicles: Vehicle[] = [];
    customers: Customer[] = [];
    rentals: Rental[] = [];

    addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
    }

    addCustomer(name: string, email: string, phone: string): void {
        this.customers.push(new Customer(name, email, phone));
    }

    rentVehicle(customerId: number, vehicleId: number, days: number): Rental | null {
        let customer = this.customers.find(c => c.id === customerId);
        let vehicle = this.vehicles.find(v => v.id === vehicleId);

        if (!customer) {
            console.log(`Không tìm thấy khách hàng`);
            return null;
        }
        if (!vehicle || !vehicle.isAvailable) {
            console.log(`Xe không tồn tại hoặc đã được thuê`);
            return null;
        }

        let totalCost = vehicle.calculateRentalCost(days);
        if (totalCost === -1) return null;

        vehicle.rent();
        let rental = new Rental(customer, vehicle, days, totalCost);
        this.rentals.push(rental);
        console.log(`Thuê xe thành công!`);
        return rental;
    }

    returnVehicle(vehicleId: number): void {
        let vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) {
            console.log(`Không tìm thấy xe`);
            return;
        }
        vehicle.returnVehicle();
    }

    listAvailableVehicle(): void {
        let availableVehicles = this.vehicles.filter(o => o.isAvailable);
        if (availableVehicles.length === 0) {
            console.log(`Không tìm thấy xe sẵn sàng cho thuê`);
            return;
        }
        availableVehicles.forEach(o => console.log(o));
    }

    listCustomerRentals(customerId: number): void {
        let customer = this.customers.find(c => c.id === customerId);
        if (!customer) {
            console.log(`Không tìm thấy khách hàng`);
            return;
        }
        let list = this.rentals.filter(o => o.customer.id === customer.id);
        if (list.length === 0) {
            console.log(`Khách hàng chưa thuê xe nào`);
            return;
        }
        list.forEach(o => console.log(o.getDetails()));
    }

    calculateTotalRevenue(): number {
        return this.rentals.reduce((sum, o) => sum + o.totalCost, 0);
    }

    getVehicleTypeCount(): void {
        let countMap = this.vehicles.reduce((acc: any, v) => {
            acc[v.type] = (acc[v.type] || 0) + 1;
            return acc;
        }, {});
        console.log(countMap);
    }

    getVehicleFeatures(vehicleId: number): void {
        let vehicle = this.vehicles.find(o => o.id === vehicleId);
        if (!vehicle) {
            console.log(`Không tìm thấy xe`);
            return;
        }
        console.log(`Tính năng: ${vehicle.getFeatures().join(", ")}`);
    }

    getVehicleInsurance(vehicleId: number): void {
        let vehicle = this.vehicles.find(o => o.id === vehicleId);
        if (!vehicle) {
            console.log(`Không tìm thấy xe`);
            return;
        }
        console.log(`Chính sách bảo hiểm: ${vehicle.getInsurancePolicy()}`);
    }
}

let choice: number;
let retal = new RentalAgency();

retal.addCustomer("Nguyễn Thị Kim Lệ", "nguyenle@gmail.com", "6273913712");
retal.addCustomer("Nguyễn Kim Kim", "kimkim@gmail.com", "9283467832");

retal.addVehicle(new Car("BWM", 67000, true, ["Điều hòa", "GPS dẫn đường"], "Bảo hiểm toàn diện"));
retal.addVehicle(new Motorcycle("Honda", 30000, true, ["Phân phối cao", "Đường dài"], "Bảo hiểm 12 tháng"));
retal.addVehicle(new Truck("SH", 80000, true, ["Thùng hàng lớn", "Bửng nâng thủy lực"], "Bảo hiểm hàng hóa và phương tiện thương mại"));

do {
    choice = +prompt(`1. Thêm khách hàng mới
2. Thêm phương tiện mới (cho chọn loại: Car, Motorcycle, Truck)
3. Thuê xe (chọn khách hàng, chọn xe, nhập số ngày)
4. Trả xe. 5. Hiển thị danh sách xe còn trống (sử dụng filter)
6. Hiển thị danh sách hợp đồng của một khách hàng (sử dụng filter)
7. Tính và hiển thị tổng doanh thu (sử dụng reduce)
8. Đếm số lượng từng loại xe (sử dụng reduce hoặc map)
9. Tìm kiếm và hiển thị thông tin bằng mã định danh
10. Hiển thị tính năng và chính sách bảo hiểm của một xe (sử dụng find)
11. Thoát chương trình.
Mời bạn nhập lựa chọn:`)!;

    switch (choice) {
        case 1:
            retal.addCustomer("Nguyễn Văn A", "vana@gmail.com", "123456789");
            console.log("Thêm khách hàng thành công!");
            break;
        case 2:
            retal.addVehicle(new Car("Toyota", 50000, true, ["Điều hòa", "Bluetooth"], "Bảo hiểm cơ bản"));
            console.log("Thêm xe thành công!");
            break;
        case 3:
            retal.rentVehicle(1, 1, 3); 
            break;
        case 4:
            retal.returnVehicle(1);
            break;
        case 5:
            retal.listAvailableVehicle();
            break;
        case 6:
            retal.listCustomerRentals(1);
            break;
        case 7:
            console.log(`Tổng doanh thu: ${retal.calculateTotalRevenue()}`);
            break;
        case 8:
            retal.getVehicleTypeCount();
            break;
        case 9:
            let found = retal.vehicles.find(v => v.id === 1);
            console.log(found || "Không tìm thấy xe");
            break;
        case 10:
            retal.getVehicleFeatures(1);
            retal.getVehicleInsurance(1);
            break;
        case 11:
            console.log("Thoát chương trình");
            break;
        default:
            console.log("Lựa chọn không hợp lệ");
    }
} while (choice !== 11);
