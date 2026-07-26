from flask import Blueprint, request, jsonify
from services.score import score_sales_call

score_bp = Blueprint("score", __name__)


@score_bp.route("/score", methods=["POST"])
def score():

    data = request.json

    result = score_sales_call(
        data["config"],
        data["conversation"]
    )

    return jsonify(result)