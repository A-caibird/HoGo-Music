<script setup>
import { onMounted, ref, computed } from 'vue';
import { userList, deleteUser, deactiveUser } from '/src/api/api.js';

let tableData = ref([]); // 所有表格数据
let userName = ref('');

// 网页上显示的表格数据
let displayTable = computed(() => {
    if (userName.value == '') {


        return tableData.value.filter(function (item, index) {
            if (index < 20) {
                return item;
            }
        });;
    }
    else {
        return tableData.value.filter(function (item, index) {
            if (item.name.includes(userName.value)) {
                return item;
            }
        });
    }
})

// 生命周期,网页加载以后第一次去拿用户列表数据
onMounted(() => {
    userList().then((res) => {
        tableData.value = res.data;
    }).catch(error => {
        // handle error
        console.log(error);
    });
});


// 删除账户
function handleDelete(index, row) {
    console.log(index, row.name);
    deleteUser({
        name: row.name
    }).then((res) => {
        userList().then((res) => {
            alert('账户删除成功');
            tableData.value = res.data;
        }).catch(error => {
            // handle error
            console.log(error);
        });
    }).catch(error => {
        // handle error
        console.log(error);
    })
}

// 停用账户
function handleDeactive(index, row) {
    console.log(index, row.name);
    deactiveUser({
        name: row.name
    }).then((res) => {
        alert('账户停用成功');
    }).catch(error => {
        console.log(error);
    })
}
</script>
<template>
    <div class="flex flex-col items-center w-full ">
        <div class="mt-[20px] bg-[white] max-h-[800px] min-h-[400px] block p-[20px]">
            <div class=" bg-transparent w-full ">
                <div
                    class="flex flex-row items-center  shadow-[0_0_2px] shadow-cyan-500/50 rounded-[20px] px-[20px] box-border">
                    <div class="mr-[10px] relative top-[2px]">
                        <el-icon><i-ep-Search /></el-icon>
                    </div>

                    <el-input placeholder="用户名" class="" :clearable="true" v-model="userName"
                        input-style="font-family:PingFang SC;color:">
                    </el-input>
                </div>
            </div>
            <div class="bg-transparent w-full mt-[20px]">
                <el-table :data="displayTable" stripe style="width: 100%" table-layout="auto" height="600">
                    <el-table-column prop="ID" label="用户ID" width="80" />
                    <el-table-column fixed prop="name" label="用户名" width="200" />
                    <el-table-column prop="email" label="邮箱" width="200" />
                    <el-table-column prop="password" label="密码" width="200" />
                    <el-table-column label="操作" width="260">
                        <template #default="scope">
                            <el-button size="small" type="primary" round @click="handleDeactive(scope.$index, scope.row)">
                                冻结账户</el-button>
                            <el-button size="small" type="danger" round
                                @click="handleDelete(scope.$index, scope.row)">删除账户</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-icon) {
    color: red !important;

}

:deep(.el-input__wrapper) {
    box-shadow: none !important;
}
</style>
