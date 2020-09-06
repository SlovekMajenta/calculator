
let defState = [
    '',
    '0'
];

export default function reducer(state = defState, action){
    const arr = state.slice();
    const reg2 = /[+|/|*]/g;       //regex for operators
    const reg3 = /=/;              //regex for equal operator
    const reg4 = /\./;             //regex for dot
    const reg5 = /\-?\d+\.?\d*/g;  //regex for numbers
    const reg6 = /^[/|*]/;         //regex for / and * at the begining
    const reg7 = /[+|\-|/|*|=]$/;  //regex for one operator at the end
    const reg9 = /[+|\-|/|*|=][+|\-|/|*|=]$/;  //regex for one operator at the end
    const reg10 = /-$/;

    switch(action.type){
        case 'CLEAN':
            return defState;
//____________________________________________________________________________________________________________________
        case 'EQUAL':
            //If there is ['',0] or ['=NaN', 'NaN'] or single operator then return ['=NaN', 'NaN']
            if(
                (arr[0] == '' && arr[1] == 0) || 
                (arr[0] == '=NaN' && arr[1] == 'NaN') ||
                 arr[0] == '+' ||
                 arr[0] == '\-' ||
                 arr[0] == '*' ||
                 arr[0] == '/'){
                arr[0] = '=NaN';
                arr[1] = 'NaN'
                return arr;
            }

            //If there is / or * at the begining return arr
            const beg = arr[0].match(reg6);
            if(beg != null && beg.length == 1){
                return arr;
            }

            //If there is one number but with nothing or + or - at the begining then return arr[0] + '=' + Number(arr[0])
            const one = arr[0].match(reg5)
            if(one != null && one.length == 1){
                arr[0] = arr[0] + '=' + Number(arr[0]);
                return arr;
            }

            //If there is equal sign return arr
            if(reg3.test(arr[0])){
                return arr;
            }

            //IF NO CONDITION MET PROCEED TO SOLVING

            //getting operators
            const ops = arr[0].match(reg2);

            //getting numbers
            let nums = arr[0].match(reg5);
            for(let i in nums){
                nums[i] = parseFloat(nums[i]);
            }

            //solving
            let result = nums[0];

            for(let i in nums){
                if(i != 0){
                    if(ops == null){
                        result += nums[i];
                        continue;
                    }
                    switch(ops[i - 1]){
                        case '+':
                            result += nums[i];
                            continue;
                        case '/':
                            result /= nums[i];
                            continue;
                        case '*':
                            result *= nums[i];
                            continue;
                        default:
                            continue;
                     }
                 }
            }

            result = result.toFixed(2);

            arr[0] = arr[0] + '=' + result;
            arr[1] = result;
            return arr; 
//____________________________________________________________________________________________________________________
        case 'OPERATION':
            const operand = action.payload.operand;
            arr[1] = operand;

            //handling two last operands if there is minus
            if(operand == '-' && !reg10.test(arr[0])){
                arr[0] += operand;
                return arr;
            }

            if(reg9.test(arr[0])){
                arr[0] = arr[0].slice(0, -2);
                arr[0] += operand;
                return arr; 
            }

            //handling last operand
            if( arr[0] == '0'){
                arr[0] = operand;
                return arr;
            }
            if( arr[0].length > 1 && reg7.test(arr[0])){
                arr[0] = arr[0].slice(0, -1);
            }

            arr[0] += operand;
            return arr;     
//____________________________________________________________________________________________________________________
        case 'NUMBER':

            //handling dot
            if(action.payload.value === '.'){
                const str = arr[1].match(reg4);

                if(str != null && str.length === 1){
                    return arr;
                } 

                if( arr[1] == '0'){

                    arr[1] += '.';
                    arr[0] = arr[1];
                    return arr;
                }

                if( arr[1] == '+' ||
                    arr[1] == '\-' ||
                    arr[1] == '*' ||
                    arr[1] == '/'){

                    arr[1] = '0' + '.';
                    arr[0] += arr[1];
                    console.log("HERE")
                    return arr;
                }
            }

            //checking equals sign
            if(reg3.test(arr[0])){
                arr[1] = action.payload.value;
                arr[0] = arr[1];
                return arr;
            }
    
            arr[0] += action.payload.value;

            //handling zero and operands at the begining
            if( arr[1] === '0'){
                arr[1] = action.payload.value;
                arr[0] = arr[1];
                }
            else if(
                arr[1] == '+' ||
                arr[1] == '\-' ||
                arr[1] == '*' ||
                arr[1] == '/'){

                arr[1] = action.payload.value;
            }
            else{
                //handling max number of digits
                arr[1] += action.payload.value;
            }
            
            return arr;
//____________________________________________________________________________________________________________________
        default:
            return state;
    }
}