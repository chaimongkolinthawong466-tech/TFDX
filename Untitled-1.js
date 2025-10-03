
let harvests = [
    {
        id: 1,
        farmerName: "สมศรี ใจดี",
        province: "จันทบุรี",
        fruitType: "ทุเรียน",
        harvestDate: "2023-07-15",
        quantity: 500,
        price: 120,
        description: "ทุเรียนหมอนทอง หวานมัน ไม่มีสารเคมี"
    },
    {
        id: 2,
        farmerName: "ประสิทธิ์ รักษ์ผลไม้",
        province: "เชียงใหม่",
        fruitType: "ลิ้นจี่",
        harvestDate: "2023-06-20",
        quantity: 300,
        price: 85,
        description: "ลิ้นจี่พันธุ์เชียงใหม่ หวานกรอบ"
    },
    {
        id: 3,
        farmerName: "มาลี ผลไม้สด",
        province: "นราธิวาส",
        fruitType: "ส้มโอ",
        harvestDate: "2023-08-10",
        quantity: 800,
        price: 45,
        description: "ส้มโอหวานฉ่ำ ไม่มีเมล็ด"
    }
];

let blockchain = [
    {
        id: "BLOCK001",
        timestamp: "2023-06-01 14:30:22",
        transaction: "ซื้อ ทุเรียน 200kg @ 120บ./kg",
        farmer: "สมศรี ใจดี",
        buyer: "บริษัท ผลไม้ไทย จำกัด",
        amount: "24,000 บาท"
    },
    {
        id: "BLOCK002",
        timestamp: "2023-06-05 09:15:47",
        transaction: "ซื้อ ลิ้นจี่ 150kg @ 85บ./kg",
        farmer: "ประสิทธิ์ รักษ์ผลไม้",
        buyer: "ตลาดสดเมืองเชียงใหม่",
        amount: "12,750 บาท"
    },
    {
        id: "BLOCK003",
        timestamp: "2023-06-10 11:45:33",
        transaction: "ซื้อ ส้มโอ 300kg @ 45บ./kg",
        farmer: "มาลี ผลไม้สด",
        buyer: "ร้านค้าปลีก สุขใจ",
        amount: "13,500 บาท"
    }
];

// Initialize Charts
function initCharts() {
    // Oversupply Chart
    const oversupplyCtx = document.getElementById('oversupplyChart').getContext('2d');
    new Chart(oversupplyCtx, {
        type: 'bar',
        data: {
            labels: ['เชียงใหม่', 'เชียงราย', 'นครราชสีมา', 'จันทบุรี', 'ตราด', 'สุราษฎร์ธานี'],
            datasets: [{
                label: 'อัตราการทำนายอุปทานเกิน (%)',
                data: [15, 8, 22, 35, 28, 12],
                backgroundColor: [
                    'rgba(46, 139, 87, 0.6)',
                    'rgba(46, 139, 87, 0.6)',
                    'rgba(255, 140, 0, 0.7)',
                    'rgba(229, 57, 53, 0.7)',
                    'rgba(255, 140, 0, 0.7)',
                    'rgba(46, 139, 87, 0.6)'
                ],
                borderColor: [
                    'rgba(46, 139, 87, 1)',
                    'rgba(46, 139, 87, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(229, 57, 53, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(46, 139, 87, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `อุปทานเกิน: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    title: {
                        display: true,
                        text: 'อัตราการทำนาย (%)'
                    }
                }
            }
        }
    });

    // Demand Chart
    const demandCtx = document.getElementById('demandChart').getContext('2d');
    new Chart(demandCtx, {
        type: 'line',
        data: {
            labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
            datasets: [{
                label: 'ทุเรียน',
                data: [30, 45, 70, 95, 120, 150, 180, 160, 90, 60, 40, 25],
                borderColor: 'rgba(229, 57, 53, 1)',
                backgroundColor: 'rgba(229, 57, 53, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'มังคุด',
                data: [20, 30, 50, 80, 110, 140, 170, 190, 160, 100, 50, 30],
                borderColor: 'rgba(46, 139, 87, 1)',
                backgroundColor: 'rgba(46, 139, 87, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'ลิ้นจี่',
                data: [40, 60, 90, 120, 100, 80, 60, 40, 30, 50, 70, 90],
                borderColor: 'rgba(255, 140, 0, 1)',
                backgroundColor: 'rgba(255, 140, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ดัชนีความต้องการ'
                    }
                }
            }
        }
    });
}

// Display Harvest Listings
function displayHarvests() {
    const listingsContainer = document.getElementById('harvestListings');
    listingsContainer.innerHTML = '';

    harvests.forEach(harvest => {
        const harvestCard = document.createElement('div');
        harvestCard.className = 'harvest-card';
        harvestCard.innerHTML = `
            <div class="harvest-info">
                <h4>${harvest.fruitType} - ${harvest.province}</h4>
                <p><i class="fas fa-user"></i> <strong>เกษตรกร:</strong> ${harvest.farmerName}</p>
                <p><i class="fas fa-calendar-alt"></i> <strong>วันเก็บเกี่ยว:</strong> ${harvest.harvestDate}</p>
                <p><i class="fas fa-weight"></i> <strong>ปริมาณ:</strong> ${harvest.quantity} กิโลกรัม</p>
                <p><i class="fas fa-tag"></i> <strong>ราคา:</strong> ${harvest.price} บาท/กิโลกรัม</p>
                <p><i class="fas fa-info-circle"></i> ${harvest.description}</p>
            </div>
            <div class="harvest-actions">
                <button class="btn btn-small btn-outline" onclick="placeBid(${harvest.id})">ประมูล</button>
                <button class="btn btn-small" onclick="preOrder(${harvest.id})">สั่งซื้อล่วงหน้า</button>
            </div>
        `;
        listingsContainer.appendChild(harvestCard);
    });
}

// Display Blockchain
function displayBlockchain() {
    const blocksContainer = document.getElementById('blockchainBlocks');
    blocksContainer.innerHTML = '';

    blockchain.slice(0, 3).forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'blockchain-block';
        blockElement.innerHTML = `
            <h4>${block.id}</h4>
            <p><strong>เวลา:</strong> ${block.timestamp}</p>
            <p><strong>รายการ:</strong> ${block.transaction}</p>
            <p><strong>เกษตรกร:</strong> ${block.farmer}</p>
            <p><strong>ผู้ซื้อ:</strong> ${block.buyer}</p>
            <p><strong>จำนวนเงิน:</strong> ${block.amount}</p>
        `;
        blocksContainer.appendChild(blockElement);
    });
}

// Handle Harvest Form Submission
document.getElementById('harvestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newHarvest = {
        id: harvests.length + 1,
        farmerName: document.getElementById('farmerName').value,
        province: document.getElementById('province').value,
        fruitType: document.getElementById('fruitType').value,
        harvestDate: document.getElementById('harvestDate').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseInt(document.getElementById('price').value),
        description: document.getElementById('description').value
    };
    
    harvests.push(newHarvest);
    displayHarvests();
    
    // Reset form
    this.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert-success';
    successMessage.textContent = 'อัปโหลดข้อมูลการเก็บเกี่ยวสำเร็จ!';
    successMessage.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
        font-weight: 500;
    `;
    
    document.querySelector('.form-container').appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
});

// Place Bid Function
function placeBid(harvestId) {
    const harvest = harvests.find(h => h.id === harvestId);
    if (harvest) {
        const bidAmount = prompt(`ป้อนราคาที่ต้องการประมูลสำหรับ ${harvest.fruitType} (ราคาเริ่มต้น: ${harvest.price} บาท/กิโลกรัม):`);
        if (bidAmount && !isNaN(bidAmount) && bidAmount > 0) {
            // Add to blockchain
            const newBlock = {
                id: `BLOCK${String(blockchain.length + 1).padStart(3, '0')}`,
                timestamp: new Date().toLocaleString('th-TH'),
                transaction: `ประมูล ${harvest.fruitType} ${harvest.quantity}kg @ ${bidAmount}บ./kg`,
                farmer: harvest.farmerName,
                buyer: "ผู้ซื้อทั่วไป",
                amount: `${(harvest.quantity * bidAmount).toLocaleString()} บาท`
            };
            
            blockchain.unshift(newBlock);
            displayBlockchain();
            
            alert(`ประมูลสำเร็จ! ราคา ${bidAmount} บาท/กิโลกรัม สำหรับ ${harvest.fruitType}`);
        }
    }
}

// Pre-order Function
function preOrder(harvestId) {
    const harvest = harvests.find(h => h.id === harvestId);
    if (harvest) {
        const quantity = prompt(`ป้อนปริมาณที่ต้องการสั่งซื้อ (สูงสุด: ${harvest.quantity} กิโลกรัม):`);
        if (quantity && !isNaN(quantity) && quantity > 0 && quantity <= harvest.quantity) {
            // Add to blockchain
            const newBlock = {
                id: `BLOCK${String(blockchain.length + 1).padStart(3, '0')}`,
                timestamp: new Date().toLocaleString('th-TH'),
                transaction: `สั่งซื้อล่วงหน้า ${harvest.fruitType} ${quantity}kg @ ${harvest.price}บ./kg`,
                farmer: harvest.farmerName,
                buyer: "ผู้ซื้อทั่วไป",
                amount: `${(quantity * harvest.price).toLocaleString()} บาท`
            };
            
            blockchain.unshift(newBlock);
            displayBlockchain();
            
            alert(`สั่งซื้อล่วงหน้าสำเร็จ! ${quantity} กิโลกรัม ของ ${harvest.fruitType}`);
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    displayHarvests();
    displayBlockchain();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});