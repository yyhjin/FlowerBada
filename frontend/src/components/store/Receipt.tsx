export default function Receipt(props: any) {
  return (
    <div>
      <div>보유 포인트 : {props.points}</div>
      <div>결제 금액 : {props.price}</div>
      <div>------------------</div>
      <div>결제 후 포인트 : {props.points - props.price}</div>
    </div>
  );
}
